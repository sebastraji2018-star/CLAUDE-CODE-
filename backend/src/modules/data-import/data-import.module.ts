import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataImportController } from './data-import.controller';
import { DataImportService } from './data-import.service';
import { DataImport } from './data-import.entity';
import { HistoricalCustomer } from './historical-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataImport, HistoricalCustomer])],
  providers: [DataImportService],
  controllers: [DataImportController],
  exports: [DataImportService],
})
export class DataImportModule {}
