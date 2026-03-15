import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICPProfile } from './icp.entity';
import { LLMService } from '@/llm/llm.service';
import { DataImportService } from '@/modules/data-import/data-import.service';

@Injectable()
export class ICPService {
  constructor(
    @InjectRepository(ICPProfile) private icpRepository: Repository<ICPProfile>,
    private llmService: LLMService,
    private dataImportService: DataImportService,
  ) {}

  async generateICP(workspaceId: string, name: string) {
    // Get historical customers
    const customers = await this.dataImportService.getHistoricalCustomers(workspaceId, 1000);

    if (customers.length === 0) {
      throw new Error('No historical customer data found. Please import customer data first.');
    }

    // Analyze patterns using LLM
    const analysisResult = await this.llmService.analyzeICPPatterns(customers);

    // Generate ICP profiles using LLM
    const icpProfiles = await this.llmService.generateICPProfile(analysisResult);

    // Create ICP record
    const icp = this.icpRepository.create({
      workspaceId,
      name,
      description: `AI-generated ICP based on ${customers.length} historical customers`,
      characteristics: {
        industries: this.extractIndustries(icpProfiles),
        companySizes: this.extractCompanySizes(icpProfiles),
        jobTitles: this.extractJobTitles(icpProfiles),
        budgetRange: this.extractBudgetRange(icpProfiles),
        painPoints: this.extractPainPoints(icpProfiles),
        buyingSignals: this.extractBuyingSignals(icpProfiles),
      },
      status: 'draft',
    });

    // Generate scoring rules
    icp.scoringRules = await this.llmService.generateLeadScoringRules(icp.characteristics, customers);

    return this.icpRepository.save(icp);
  }

  async activateICP(workspaceId: string, icpId: string) {
    const icp = await this.icpRepository.findOne({
      where: { id: icpId, workspaceId },
    });

    if (!icp) {
      throw new NotFoundException('ICP not found');
    }

    // Deactivate other profiles
    await this.icpRepository.update(
      { workspaceId, id: ('not', icpId) },
      { isDefault: false },
    );

    icp.status = 'active';
    icp.isDefault = true;

    return this.icpRepository.save(icp);
  }

  async getICPs(workspaceId: string) {
    return this.icpRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveICP(workspaceId: string) {
    return this.icpRepository.findOne({
      where: { workspaceId, status: 'active', isDefault: true },
    });
  }

  async updateICP(workspaceId: string, icpId: string, updates: any) {
    const icp = await this.icpRepository.findOne({
      where: { id: icpId, workspaceId },
    });

    if (!icp) {
      throw new NotFoundException('ICP not found');
    }

    Object.assign(icp, updates);
    return this.icpRepository.save(icp);
  }

  async deleteICP(workspaceId: string, icpId: string) {
    const icp = await this.icpRepository.findOne({
      where: { id: icpId, workspaceId },
    });

    if (!icp) {
      throw new NotFoundException('ICP not found');
    }

    return this.icpRepository.remove(icp);
  }

  // Helper methods
  private extractIndustries(profiles: any[]): string[] {
    const industries = new Set<string>();
    profiles.forEach(p => {
      if (Array.isArray(p.characteristics?.industries)) {
        p.characteristics.industries.forEach(i => industries.add(i));
      }
    });
    return Array.from(industries);
  }

  private extractCompanySizes(profiles: any[]): string[] {
    const sizes = new Set<string>();
    profiles.forEach(p => {
      if (Array.isArray(p.characteristics?.companySizes)) {
        p.characteristics.companySizes.forEach(s => sizes.add(s));
      }
    });
    return Array.from(sizes);
  }

  private extractJobTitles(profiles: any[]): string[] {
    const titles = new Set<string>();
    profiles.forEach(p => {
      if (Array.isArray(p.characteristics?.jobTitles)) {
        p.characteristics.jobTitles.forEach(t => titles.add(t));
      }
    });
    return Array.from(titles);
  }

  private extractBudgetRange(profiles: any[]): { min: number; max: number } {
    let minBudget = Infinity;
    let maxBudget = 0;

    profiles.forEach(p => {
      const range = p.characteristics?.budgetRange;
      if (range) {
        minBudget = Math.min(minBudget, range.min || 0);
        maxBudget = Math.max(maxBudget, range.max || 0);
      }
    });

    return { min: minBudget === Infinity ? 0 : minBudget, max: maxBudget };
  }

  private extractPainPoints(profiles: any[]): string[] {
    const points = new Set<string>();
    profiles.forEach(p => {
      if (Array.isArray(p.characteristics?.painPoints)) {
        p.characteristics.painPoints.forEach(pt => points.add(pt));
      }
    });
    return Array.from(points);
  }

  private extractBuyingSignals(profiles: any[]): string[] {
    const signals = new Set<string>();
    profiles.forEach(p => {
      if (Array.isArray(p.characteristics?.buyingSignals)) {
        p.characteristics.buyingSignals.forEach(s => signals.add(s));
      }
    });
    return Array.from(signals);
  }
}
