import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentOrchestrator } from './agent-orchestrator.service';
import { AgentJob } from './agent-job.entity';
import { ICPModule } from '@/modules/icp-generation/icp.module';
import { LeadSearchModule } from '@/modules/lead-search/lead-search.module';
import { LeadQualificationModule } from '@/modules/lead-qualification/qualification.module';
import { EngagementModule } from '@/modules/engagement/engagement.module';
import { AnalyticsModule } from '@/modules/analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentJob]),
    ICPModule,
    LeadSearchModule,
    LeadQualificationModule,
    EngagementModule,
    AnalyticsModule,
  ],
  providers: [AgentOrchestrator],
  exports: [AgentOrchestrator],
})
export class AgentOrchestratorModule {}
