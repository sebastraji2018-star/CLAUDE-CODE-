import { Injectable } from '@nestjs/common';
import { LeadSearchService } from '@/modules/lead-search/lead-search.service';
import { LLMService } from '@/llm/llm.service';

@Injectable()
export class LeadQualificationService {
  constructor(
    private leadSearchService: LeadSearchService,
    private llmService: LLMService,
  ) {}

  async qualifyLead(workspaceId: string, leadId: string, icpProfile: any): Promise<any> {
    // Calculate score based on ICP match
    const score = await this.calculateScore(leadId, icpProfile);
    const status = this.determineQualificationStatus(score);
    const matchPercentage = await this.calculateICPMatch(leadId, icpProfile);

    await this.leadSearchService.updateLeadQualification(leadId, score, status, matchPercentage);

    return {
      leadId,
      score,
      status,
      icpMatchPercentage: matchPercentage,
    };
  }

  private async calculateScore(leadId: string, icpProfile: any): Promise<number> {
    // Simple scoring logic - would be enhanced with ML
    let score = 0;

    if (icpProfile && icpProfile.scoringRules) {
      const rules = icpProfile.scoringRules;
      // Apply scoring rules
      score = Math.min(100, score);
    } else {
      score = 50; // Default mid-range score
    }

    return score;
  }

  private async calculateICPMatch(leadId: string, icpProfile: any): Promise<number> {
    // Calculate percentage match with ICP
    // This would compare lead attributes with ICP characteristics
    return 75; // Example value
  }

  private determineQualificationStatus(score: number): string {
    if (score >= 80) return 'hot';
    if (score >= 50) return 'qualified';
    return 'unqualified';
  }

  async qualifyBulkLeads(workspaceId: string, leadIds: string[], icpProfile: any) {
    const results = [];

    for (const leadId of leadIds) {
      const result = await this.qualifyLead(workspaceId, leadId, icpProfile);
      results.push(result);
    }

    return results;
  }

  async getQualifiedLeads(workspaceId: string) {
    return this.leadSearchService.getLeads(workspaceId, {
      qualificationStatus: 'qualified',
    });
  }

  async getHotLeads(workspaceId: string) {
    return this.leadSearchService.getLeads(workspaceId, {
      qualificationStatus: 'hot',
    });
  }
}
