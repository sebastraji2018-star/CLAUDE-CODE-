import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICPController } from './icp.controller';
import { ICPService } from './icp.service';
import { ICPProfile } from './icp.entity';
import { LLMModule } from '@/llm/llm.module';
import { DataImportModule } from '@/modules/data-import/data-import.module';

@Module({
  imports: [TypeOrmModule.forFeature([ICPProfile]), LLMModule, DataImportModule],
  providers: [ICPService],
  controllers: [ICPController],
  exports: [ICPService],
})
export class ICPModule {}
