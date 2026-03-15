import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EngagementSequence } from './engagement.entity';
import { LeadSearchService } from '@/modules/lead-search/lead-search.service';
import { LLMService } from '@/llm/llm.service';

@Injectable()
export class EngagementService {
  constructor(
    @InjectRepository(EngagementSequence) private sequenceRepository: Repository<EngagementSequence>,
    private leadSearchService: LeadSearchService,
    private llmService: LLMService,
  ) {}

  async createEngagementSequence(
    workspaceId: string,
    leadId: string,
    campaignId: string,
    sequenceType: string = 'email',
  ) {
    const sequence = this.sequenceRepository.create({
      workspaceId,
      leadId,
      campaignId,
      sequenceType,
      status: 'pending',
      messages: [],
    });

    return this.sequenceRepository.save(sequence);
  }

  async generatePersonalizedMessage(
    workspaceId: string,
    sequenceId: string,
    lead: any,
    companyInfo: string,
    campaignContext: string,
  ) {
    const message = await this.llmService.generatePersonalizedMessage(lead, companyInfo, campaignContext);

    const sequence = await this.sequenceRepository.findOne({ where: { id: sequenceId } });
    if (sequence) {
      sequence.personalizedContent = message;
      sequence.messages.push({
        step: 1,
        content: message,
        channel: sequence.sequenceType,
        createdAt: new Date(),
      });
      await this.sequenceRepository.save(sequence);
    }

    return { sequenceId, message };
  }

  async sendEngagementMessage(workspaceId: string, sequenceId: string) {
    const sequence = await this.sequenceRepository.findOne({ where: { id: sequenceId } });

    if (!sequence) {
      throw new Error('Sequence not found');
    }

    // Simulate sending message
    sequence.status = 'in_progress';
    sequence.sentAt = new Date();

    await this.sequenceRepository.save(sequence);

    // In real implementation, this would integrate with SendGrid, LinkedIn API, Twilio, etc.
    return {
      sequenceId,
      status: 'sent',
      sentAt: new Date(),
    };
  }

  async trackEngagementResponse(
    sequenceId: string,
    responseType: 'opened' | 'clicked' | 'responded',
  ) {
    const sequence = await this.sequenceRepository.findOne({ where: { id: sequenceId } });

    if (!sequence) {
      throw new Error('Sequence not found');
    }

    if (responseType === 'opened') {
      sequence.opened = true;
    } else if (responseType === 'clicked') {
      sequence.clicked = true;
    } else if (responseType === 'responded') {
      sequence.responded = true;
      sequence.status = 'completed';
    }

    await this.sequenceRepository.save(sequence);
    return sequence;
  }

  async getEngagementSequences(workspaceId: string) {
    return this.sequenceRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
    });
  }

  async getEngagementMetrics(workspaceId: string) {
    const sequences = await this.sequenceRepository.find({
      where: { workspaceId },
    });

    const totalSequences = sequences.length;
    const openedCount = sequences.filter(s => s.opened).length;
    const clickedCount = sequences.filter(s => s.clicked).length;
    const respondedCount = sequences.filter(s => s.responded).length;

    return {
      totalSequences,
      openRate: totalSequences > 0 ? (openedCount / totalSequences) * 100 : 0,
      clickRate: totalSequences > 0 ? (clickedCount / totalSequences) * 100 : 0,
      responseRate: totalSequences > 0 ? (respondedCount / totalSequences) * 100 : 0,
      respondedLeads: respondedCount,
    };
  }
}
