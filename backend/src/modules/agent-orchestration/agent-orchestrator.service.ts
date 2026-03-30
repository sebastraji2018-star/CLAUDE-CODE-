import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentJob } from './agent-job.entity';
import { ICPService } from '@/modules/icp-generation/icp.service';
import { LeadSearchService } from '@/modules/lead-search/lead-search.service';
import { LeadQualificationService } from '@/modules/lead-qualification/qualification.service';
import { EngagementService } from '@/modules/engagement/engagement.service';
import { AnalyticsService } from '@/modules/analytics/analytics.service';
import { BrandContextService } from '@/modules/brand-context/brand-context.service';
import { CompetitorTrackingService } from '@/modules/competitor-tracking/competitor-tracking.service';
import { LLMService } from '@/llm/llm.service';
import { Workspace } from '@/modules/workspace/workspace.entity';
import { InjectRepository as InjectRepo } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class AgentOrchestrator implements OnModuleInit {
  private agentRunners: Map<string, NodeJS.Timer> = new Map();
  private lastCompetitorRunDate: Map<string, string> = new Map();

  constructor(
    @InjectRepository(AgentJob) private jobRepository: Repository<AgentJob>,
    @InjectRepo(Workspace) private workspaceRepository: TypeOrmRepository<Workspace>,
    private icpService: ICPService,
    private leadSearchService: LeadSearchService,
    private qualificationService: LeadQualificationService,
    private engagementService: EngagementService,
    private analyticsService: AnalyticsService,
    private brandContextService: BrandContextService,
    private competitorTrackingService: CompetitorTrackingService,
    private llmService: LLMService,
  ) {}

  onModuleInit() {
    console.log('🤖 Agent Orchestrator initialized');
    this.startAgentScheduler();
  }

  private startAgentScheduler() {
    // Run agent orchestration every 5 minutes
    setInterval(async () => {
      await this.executeAgentWorkflow();
    }, 5 * 60 * 1000);

    // Also run immediately on startup
    this.executeAgentWorkflow();
  }

  private async executeAgentWorkflow() {
    console.log('🚀 Starting agent workflow execution...');

    const workspaces = await this.workspaceRepository.find({
      where: { status: 'active' },
    });

    for (const workspace of workspaces) {
      try {
        // 1. ICP Analysis Agent (runs daily)
        await this.runICPAnalysisAgent(workspace.id);

        // 2. Lead Search Agent (runs every hour)
        await this.runLeadSearchAgent(workspace.id);

        // 3. Lead Qualification Agent (runs every 30 mins)
        await this.runQualificationAgent(workspace.id);

        // 4. Engagement Agent (runs every hour)
        await this.runEngagementAgent(workspace.id);

        // 5. Optimization Agent (runs daily)
        await this.runOptimizationAgent(workspace.id);

        // 6. Competitor Analysis Agent (runs daily)
        await this.runCompetitorAnalysisAgent(workspace.id);
      } catch (error) {
        console.error(`Error executing workflow for workspace ${workspace.id}:`, error);
      }
    }

    console.log('✅ Agent workflow execution completed');
  }

  private async runICPAnalysisAgent(workspaceId: string) {
    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'icp_analysis',
      status: 'running',
      config: {},
    });

    const savedJob = await this.jobRepository.save(job);

    try {
      // Get or create ICP
      const icps = await this.icpService.getICPs(workspaceId);
      if (icps.length === 0) {
        await this.icpService.generateICP(workspaceId, 'Auto-generated ICP');
      }

      savedJob.status = 'completed';
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  private async runLeadSearchAgent(workspaceId: string) {
    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'lead_search',
      status: 'running',
      config: { source: 'automated_search' },
    });

    const savedJob = await this.jobRepository.save(job);

    try {
      // Simulate lead discovery
      // In production, this would integrate with LinkedIn API, Hunter.io, etc.
      const mockLeads = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@techcompany.com',
          company: 'Tech Company Inc',
          jobTitle: 'VP of Sales',
          industry: 'Technology',
          companySize: '100-500',
          source: 'linkedin_search',
        },
      ];

      const createdLeads = await this.leadSearchService.bulkCreateLeads(workspaceId, mockLeads);

      savedJob.status = 'completed';
      savedJob.itemsProcessed = createdLeads.length;
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  private async runQualificationAgent(workspaceId: string) {
    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'lead_qualification',
      status: 'running',
      config: {},
    });

    const savedJob = await this.jobRepository.save(job);

    try {
      const icp = await this.icpService.getActiveICP(workspaceId);
      if (!icp) {
        throw new Error('No active ICP found');
      }

      const unqualifiedLeads = await this.leadSearchService.getLeads(workspaceId, {
        qualificationStatus: 'unqualified',
      });

      const leadIds = unqualifiedLeads.map(l => l.id);
      await this.qualificationService.qualifyBulkLeads(workspaceId, leadIds, icp);

      savedJob.status = 'completed';
      savedJob.itemsProcessed = leadIds.length;
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  private async runEngagementAgent(workspaceId: string) {
    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'engagement',
      status: 'running',
      config: {},
    });

    const savedJob = await this.jobRepository.save(job);

    try {
      const qualifiedLeads = await this.qualificationService.getQualifiedLeads(workspaceId);

      let engagedCount = 0;
      for (const lead of qualifiedLeads) {
        try {
          const sequence = await this.engagementService.createEngagementSequence(
            workspaceId,
            lead.id,
            'campaign-auto',
            'email',
          );

          await this.engagementService.generatePersonalizedMessage(
            workspaceId,
            sequence.id,
            lead,
            `${lead.company}`,
            'Automated engagement campaign',
          );

          await this.engagementService.sendEngagementMessage(workspaceId, sequence.id);
          engagedCount++;

          await this.analyticsService.trackEvent(
            workspaceId,
            'lead_engaged',
            lead.id,
            'lead',
            { sequenceId: sequence.id },
          );
        } catch (error) {
          console.error(`Error engaging lead ${lead.id}:`, error);
        }
      }

      savedJob.status = 'completed';
      savedJob.itemsProcessed = engagedCount;
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  private async runOptimizationAgent(workspaceId: string) {
    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'optimization',
      status: 'running',
      config: {},
    });

    const savedJob = await this.jobRepository.save(job);

    try {
      const metrics = await this.analyticsService.getDashboardMetrics(workspaceId);
      const roiMetrics = await this.analyticsService.getROIMetrics(workspaceId);

      savedJob.status = 'completed';
      savedJob.result = { metrics, roiMetrics };
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  private async runCompetitorAnalysisAgent(workspaceId: string) {
    // Run once per day per workspace
    const today = new Date().toISOString().split('T')[0];
    if (this.lastCompetitorRunDate.get(workspaceId) === today) return;

    const job = this.jobRepository.create({
      workspaceId,
      agentType: 'competitor_analysis',
      status: 'running',
      config: {},
    });
    const savedJob = await this.jobRepository.save(job);

    try {
      const brandContext = await this.brandContextService.getBrandContext(workspaceId);
      if (!brandContext) {
        savedJob.status = 'completed';
        savedJob.completedAt = new Date();
        await this.jobRepository.save(savedJob);
        return;
      }

      const competitors = await this.competitorTrackingService.getCompetitors(workspaceId);
      const snapshots: any[] = [];

      // Generate metrics for each competitor via Claude
      for (const competitor of competitors) {
        try {
          const metrics = await this.llmService.generateCompetitorMetrics(brandContext, competitor.name);
          const snapshot = await this.competitorTrackingService.saveSnapshot(
            workspaceId,
            competitor.id,
            { ...metrics, aiInsights: null },
          );
          snapshots.push({ ...snapshot, competitorId: competitor.id });
        } catch (err) {
          console.error(`Error generating metrics for competitor ${competitor.name}:`, err);
        }
      }

      // Generate own brand metrics
      const ownMetrics = await this.llmService.generateCompetitorMetrics(brandContext, brandContext.brandName + ' (own brand)');
      const ownSnapshot = await this.competitorTrackingService.saveSnapshot(workspaceId, null, {
        ...ownMetrics,
        aiInsights: null,
      });

      // Generate daily AI landscape analysis
      const allSnapshots = [...snapshots, { ...ownSnapshot, competitorId: null }];
      const insights = await this.llmService.analyzeCompetitiveLandscape(
        brandContext,
        competitors,
        allSnapshots,
      );

      // Save insights to own brand snapshot
      await this.competitorTrackingService.saveSnapshot(workspaceId, null, {
        ...ownMetrics,
        aiInsights: insights,
      });

      this.lastCompetitorRunDate.set(workspaceId, today);
      savedJob.status = 'completed';
      savedJob.itemsProcessed = competitors.length + 1;
      savedJob.completedAt = new Date();
    } catch (error) {
      savedJob.status = 'failed';
      savedJob.error = error.message;
    }

    await this.jobRepository.save(savedJob);
  }

  async getAgentStatus(workspaceId: string) {
    const jobs = await this.jobRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
      take: 20,
    });

    return {
      workspaceId,
      jobs,
      agentTypes: ['icp_analysis', 'lead_search', 'qualification', 'engagement', 'optimization'],
    };
  }

  async getJobDetails(workspaceId: string, jobId: string) {
    return this.jobRepository.findOne({
      where: { id: jobId, workspaceId },
    });
  }
}
