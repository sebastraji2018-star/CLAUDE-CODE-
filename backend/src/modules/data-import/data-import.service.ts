import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataImport } from './data-import.entity';
import { HistoricalCustomer } from './historical-customer.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DataImportService {
  constructor(
    @InjectRepository(DataImport) private dataImportRepository: Repository<DataImport>,
    @InjectRepository(HistoricalCustomer) private customerRepository: Repository<HistoricalCustomer>,
  ) {}

  async importData(workspaceId: string, fileName: string, fileType: string, records: any[]) {
    const importRecord = this.dataImportRepository.create({
      workspaceId,
      fileName,
      fileType,
      totalRecords: records.length,
      status: 'processing',
    });

    const savedImport = await this.dataImportRepository.save(importRecord);

    // Process records
    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (const record of records) {
      try {
        // Validate required fields
        if (!record.email || !record.name) {
          throw new Error('Email and name are required');
        }

        const customer = this.customerRepository.create({
          workspaceId,
          importId: savedImport.id,
          email: record.email,
          name: record.name,
          company: record.company || null,
          industry: record.industry || null,
          jobTitle: record.jobTitle || null,
          companySize: record.companySize || null,
          budgetRange: record.budgetRange || null,
          source: record.source || 'csv_import',
          conversionStatus: record.conversionStatus || 'lead',
          conversionDate: record.conversionDate ? new Date(record.conversionDate) : null,
          dealValue: record.dealValue || null,
          tags: Array.isArray(record.tags) ? record.tags : [],
          additionalData: record.additionalData || {},
        });

        await this.customerRepository.save(customer);
        successCount++;
      } catch (error) {
        failCount++;
        errors.push({
          record: record.email || record.name,
          error: error.message,
        });
      }
    }

    // Update import status
    savedImport.status = 'completed';
    savedImport.successfulRecords = successCount;
    savedImport.failedRecords = failCount;
    savedImport.errors = errors;
    savedImport.completedAt = new Date();

    await this.dataImportRepository.save(savedImport);

    return {
      importId: savedImport.id,
      status: 'completed',
      totalRecords: records.length,
      successfulRecords: successCount,
      failedRecords: failCount,
      errors,
    };
  }

  async getImportHistory(workspaceId: string) {
    return this.dataImportRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async getImportDetails(workspaceId: string, importId: string) {
    const importRecord = await this.dataImportRepository.findOne({
      where: { id: importId, workspaceId },
    });

    if (!importRecord) {
      throw new NotFoundException('Import not found');
    }

    return importRecord;
  }

  async getHistoricalCustomers(workspaceId: string, limit: number = 100) {
    return this.customerRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getCustomersByIndustry(workspaceId: string, industry: string) {
    return this.customerRepository.find({
      where: { workspaceId, industry },
    });
  }

  async getConvertedCustomers(workspaceId: string) {
    return this.customerRepository.find({
      where: { workspaceId, conversionStatus: 'customer' },
    });
  }
}
