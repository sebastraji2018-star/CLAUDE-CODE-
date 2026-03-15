import { Module } from '@nestjs/common';
import { LeadQualificationService } from './qualification.service';
import { LeadSearchModule } from '@/modules/lead-search/lead-search.module';
import { LLMModule } from '@/llm/llm.module';

@Module({
  imports: [LeadSearchModule, LLMModule],
  providers: [LeadQualificationService],
  exports: [LeadQualificationService],
})
export class LeadQualificationModule {}
