import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from './analytics.entity';
import { LeadSearchService } from '@/modules/lead-search/lead-search.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent) private eventRepository: Repository<AnalyticsEvent>,
    private leadSearchService: LeadSearchService,
  ) {}

  async trackEvent(
    workspaceId: string,
    eventType: string,
    entityId: string,
    entityType: string,
    data: any = {},
  ) {
    const event = this.eventRepository.create({
      workspaceId,
      eventType,
      entityId,
      entityType,
      data,
    });

    return this.eventRepository.save(event);
  }

  async getDashboardMetrics(workspaceId: string) {
    const leadCount = await this.leadSearchService.getLeadCount(workspaceId);
    const qualifiedLeadCount = await this.leadSearchService.getLeadCount(workspaceId, 'qualified');
    const convertedLeadCount = await this.leadSearchService.getLeadCount(workspaceId, 'converted');

    return {
      totalLeads: leadCount,
      qualifiedLeads: qualifiedLeadCount,
      convertedLeads: convertedLeadCount,
      conversionRate: leadCount > 0 ? (convertedLeadCount / leadCount) * 100 : 0,
      qualificationRate: leadCount > 0 ? (qualifiedLeadCount / leadCount) * 100 : 0,
    };
  }

  async getROIMetrics(workspaceId: string) {
    const events = await this.eventRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
      take: 1000,
    });

    const leads = events.filter(e => e.eventType === 'lead_created');
    const conversions = events.filter(e => e.eventType === 'lead_converted');
    const costPerLead = 50; // Example: $50 per lead generated (would come from actual costs)
    const averageDealValue = 5000; // Example: $5000 average deal value

    const totalLeadsGenerated = leads.length;
    const totalConversions = conversions.length;
    const totalCost = totalLeadsGenerated * costPerLead;
    const totalRevenue = totalConversions * averageDealValue;
    const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

    return {
      leadsGenerated: totalLeadsGenerated,
      conversions: totalConversions,
      conversionRate: totalLeadsGenerated > 0 ? (totalConversions / totalLeadsGenerated) * 100 : 0,
      costPerLead,
      averageDealValue,
      totalCost,
      totalRevenue,
      roi,
    };
  }

  async getTimeSeriesMetrics(workspaceId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const events = await this.eventRepository.find({
      where: {
        workspaceId,
      },
    });

    const dailyMetrics = {};

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyMetrics[dateStr] = {
        leads: 0,
        conversions: 0,
      };
    }

    events.forEach(event => {
      const dateStr = event.createdAt.toISOString().split('T')[0];
      if (dailyMetrics[dateStr]) {
        if (event.eventType === 'lead_created') {
          dailyMetrics[dateStr].leads++;
        } else if (event.eventType === 'lead_converted') {
          dailyMetrics[dateStr].conversions++;
        }
      }
    });

    return Object.entries(dailyMetrics).map(([date, metrics]) => ({
      date,
      ...metrics,
    }));
  }
}
