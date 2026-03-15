import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadSearchController } from './lead-search.controller';
import { LeadSearchService } from './lead-search.service';
import { Lead } from './lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadSearchService],
  controllers: [LeadSearchController],
  exports: [LeadSearchService],
})
export class LeadSearchModule {}
