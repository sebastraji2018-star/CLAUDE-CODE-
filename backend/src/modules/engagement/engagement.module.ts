import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementService } from './engagement.service';
import { EngagementSequence } from './engagement.entity';
import { LeadSearchModule } from '@/modules/lead-search/lead-search.module';
import { LLMModule } from '@/llm/llm.module';

@Module({
  imports: [TypeOrmModule.forFeature([EngagementSequence]), LeadSearchModule, LLMModule],
  providers: [EngagementService],
  exports: [EngagementService],
})
export class EngagementModule {}
