import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeadSearchService } from './lead-search.service';

@Controller('workspaces/:workspaceId/leads')
@UseGuards(AuthGuard('jwt'))
export class LeadSearchController {
  constructor(private leadSearchService: LeadSearchService) {}

  @Get()
  async getLeads(
    @Param('workspaceId') workspaceId: string,
    @Query('status') status?: string,
    @Query('qualificationStatus') qualificationStatus?: string,
    @Query('minScore') minScore?: string,
  ) {
    return this.leadSearchService.getLeads(workspaceId, {
      status,
      qualificationStatus,
      minScore: minScore ? parseInt(minScore) : null,
    });
  }

  @Get('count')
  async getLeadCount(
    @Param('workspaceId') workspaceId: string,
    @Query('status') status?: string,
  ) {
    return {
      count: await this.leadSearchService.getLeadCount(workspaceId, status),
    };
  }

  @Get(':leadId')
  async getLead(
    @Param('workspaceId') workspaceId: string,
    @Param('leadId') leadId: string,
  ) {
    // Implementation would fetch specific lead
    return { id: leadId };
  }

  @Post()
  async createLead(
    @Param('workspaceId') workspaceId: string,
    @Body() body: any,
  ) {
    return this.leadSearchService.createLead(workspaceId, body);
  }

  @Post('bulk-upload')
  async bulkUpload(
    @Param('workspaceId') workspaceId: string,
    @Body() body: { leads: any[] },
  ) {
    return this.leadSearchService.bulkCreateLeads(workspaceId, body.leads);
  }

  @Put(':leadId/status')
  async updateStatus(
    @Param('workspaceId') workspaceId: string,
    @Param('leadId') leadId: string,
    @Body() body: { status: string },
  ) {
    await this.leadSearchService.updateLeadStatus(leadId, body.status);
    return { success: true };
  }
}
