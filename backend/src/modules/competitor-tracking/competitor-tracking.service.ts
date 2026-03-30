import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Competitor } from './competitor.entity';
import { CompetitiveSnapshot } from './competitive-snapshot.entity';

@Injectable()
export class CompetitorTrackingService {
  constructor(
    @InjectRepository(Competitor)
    private competitorRepository: Repository<Competitor>,
    @InjectRepository(CompetitiveSnapshot)
    private snapshotRepository: Repository<CompetitiveSnapshot>,
  ) {}

  // --- Competitors ---

  async addCompetitor(workspaceId: string, data: { name: string; website?: string; industry?: string }): Promise<Competitor> {
    const competitor = this.competitorRepository.create({ ...data, workspaceId });
    return this.competitorRepository.save(competitor);
  }

  async getCompetitors(workspaceId: string): Promise<Competitor[]> {
    return this.competitorRepository.find({ where: { workspaceId }, order: { createdAt: 'ASC' } });
  }

  async removeCompetitor(workspaceId: string, competitorId: string): Promise<void> {
    const competitor = await this.competitorRepository.findOne({ where: { id: competitorId, workspaceId } });
    if (!competitor) throw new NotFoundException('Competitor not found');
    await this.competitorRepository.remove(competitor);
  }

  // --- Snapshots ---

  async saveSnapshot(
    workspaceId: string,
    competitorId: string | null,
    data: {
      marketPositionScore: number;
      shareOfVoice: number;
      pricingIndex: number;
      featureScore: number;
      sentimentScore: number;
      details: Record<string, any>;
      aiInsights?: string;
    },
  ): Promise<CompetitiveSnapshot> {
    const today = new Date().toISOString().split('T')[0];

    // Upsert: replace today's snapshot for same workspace/competitor
    const existing = await this.snapshotRepository.findOne({
      where: { workspaceId, competitorId: competitorId ?? undefined, snapshotDate: today },
    });

    if (existing) {
      Object.assign(existing, data);
      return this.snapshotRepository.save(existing);
    }

    const snapshot = this.snapshotRepository.create({
      workspaceId,
      competitorId,
      snapshotDate: today,
      ...data,
    });
    return this.snapshotRepository.save(snapshot);
  }

  async getLatestSnapshots(workspaceId: string): Promise<CompetitiveSnapshot[]> {
    // Get the most recent snapshot for each competitor + own brand
    const subQuery = this.snapshotRepository
      .createQueryBuilder('s')
      .select('s.competitorId', 'cid')
      .addSelect('MAX(s.snapshotDate)', 'maxDate')
      .where('s.workspaceId = :workspaceId', { workspaceId })
      .groupBy('s.competitorId');

    return this.snapshotRepository
      .createQueryBuilder('snap')
      .innerJoin(
        `(${subQuery.getQuery()})`,
        'latest',
        'snap.competitorId = latest.cid AND snap.snapshotDate = latest."maxDate"',
      )
      .setParameters(subQuery.getParameters())
      .where('snap.workspaceId = :workspaceId', { workspaceId })
      .getMany();
  }

  async getTrendData(workspaceId: string, days: number = 30): Promise<CompetitiveSnapshot[]> {
    const from = new Date();
    from.setDate(from.getDate() - days);
    const fromStr = from.toISOString().split('T')[0];
    const toStr = new Date().toISOString().split('T')[0];

    return this.snapshotRepository.find({
      where: { workspaceId, snapshotDate: Between(fromStr, toStr) },
      order: { snapshotDate: 'ASC' },
    });
  }

  async getLatestInsights(workspaceId: string, limit: number = 7): Promise<CompetitiveSnapshot[]> {
    return this.snapshotRepository.find({
      where: { workspaceId, competitorId: undefined },
      order: { snapshotDate: 'DESC' },
      take: limit,
    });
  }

  async getBenchmarkSummary(workspaceId: string): Promise<any> {
    const snapshots = await this.getLatestSnapshots(workspaceId);
    const competitors = await this.getCompetitors(workspaceId);

    const ownBrand = snapshots.find(s => !s.competitorId);
    const competitorSnapshots = snapshots.filter(s => s.competitorId);

    const avgCompetitorScore =
      competitorSnapshots.length > 0
        ? competitorSnapshots.reduce((sum, s) => sum + s.marketPositionScore, 0) / competitorSnapshots.length
        : 0;

    const avgShareOfVoice =
      competitorSnapshots.length > 0
        ? competitorSnapshots.reduce((sum, s) => sum + s.shareOfVoice, 0) / competitorSnapshots.length
        : 0;

    return {
      ownBrand,
      competitors: competitorSnapshots.map(s => {
        const meta = competitors.find(c => c.id === s.competitorId);
        return { ...s, competitorName: meta?.name ?? 'Unknown' };
      }),
      summary: {
        competitiveScore: ownBrand?.marketPositionScore ?? 0,
        shareOfVoice: ownBrand?.shareOfVoice ?? 0,
        sentimentScore: ownBrand?.sentimentScore ?? 0,
        featureScore: ownBrand?.featureScore ?? 0,
        avgCompetitorScore: Math.round(avgCompetitorScore),
        avgShareOfVoice: Math.round(avgShareOfVoice),
      },
    };
  }
}
