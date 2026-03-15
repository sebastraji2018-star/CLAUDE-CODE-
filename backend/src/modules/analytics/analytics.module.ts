import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsEvent } from './analytics.entity';
import { LeadSearchModule } from '@/modules/lead-search/lead-search.module';
import { EngagementModule } from '@/modules/engagement/engagement.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent]), LeadSearchModule, EngagementModule],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
