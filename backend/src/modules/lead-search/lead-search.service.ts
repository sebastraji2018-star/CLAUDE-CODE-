import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadSearchService {
  constructor(
    @InjectRepository(Lead) private leadRepository: Repository<Lead>,
  ) {}

  async createLead(workspaceId: string, leadData: any) {
    const existingLead = await this.leadRepository.findOne({
      where: { workspaceId, email: leadData.email },
    });

    if (existingLead) {
      return existingLead;
    }

    const lead = this.leadRepository.create({
      workspaceId,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: leadData.phone || null,
      company: leadData.company,
      jobTitle: leadData.jobTitle || null,
      industry: leadData.industry || null,
      companySize: leadData.companySize || null,
      location: leadData.location || null,
      linkedinUrl: leadData.linkedinUrl || null,
      source: leadData.source || 'search',
      enrichmentData: leadData.enrichmentData || {},
      status: 'new',
    });

    return this.leadRepository.save(lead);
  }

  async getLeads(workspaceId: string, filters: any = {}) {
    const query = this.leadRepository
      .createQueryBuilder('lead')
      .where('lead.workspaceId = :workspaceId', { workspaceId });

    if (filters.status) {
      query.andWhere('lead.status = :status', { status: filters.status });
    }

    if (filters.qualificationStatus) {
      query.andWhere('lead.qualificationStatus = :qualificationStatus', {
        qualificationStatus: filters.qualificationStatus,
      });
    }

    if (filters.minScore) {
      query.andWhere('lead.qualificationScore >= :minScore', { minScore: filters.minScore });
    }

    return query.orderBy('lead.qualificationScore', 'DESC').take(100).getMany();
  }

  async updateLeadStatus(leadId: string, status: string) {
    await this.leadRepository.update(leadId, { status });
  }

  async updateLeadQualification(
    leadId: string,
    qualificationScore: number,
    qualificationStatus: string,
    icpMatchPercentage: number,
  ) {
    await this.leadRepository.update(leadId, {
      qualificationScore,
      qualificationStatus,
      icpMatchPercentage,
    });
  }

  async getLeadCount(workspaceId: string, status?: string) {
    const query = this.leadRepository.createQueryBuilder('lead').where('lead.workspaceId = :workspaceId', {
      workspaceId,
    });

    if (status) {
      query.andWhere('lead.status = :status', { status });
    }

    return query.getCount();
  }

  async bulkCreateLeads(workspaceId: string, leadsData: any[]) {
    const leads = leadsData.map(data =>
      this.leadRepository.create({
        workspaceId,
        ...data,
      }),
    );

    return this.leadRepository.save(leads);
  }
}
