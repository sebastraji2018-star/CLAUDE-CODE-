import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './workspace.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace) private workspaceRepository: Repository<Workspace>,
  ) {}

  async create(ownerId: string, name: string, plan: string = 'starter') {
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + uuidv4().substring(0, 8);

    const workspace = this.workspaceRepository.create({
      name,
      slug,
      ownerId,
      plan,
      status: 'active',
      limits: this.getLimitsForPlan(plan),
      settings: {
        icpEnabled: true,
        leadSearchEnabled: true,
        engagementEnabled: true,
        analyticsEnabled: true,
      },
    });

    return this.workspaceRepository.save(workspace);
  }

  async getByOwner(ownerId: string) {
    return this.workspaceRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: string, ownerId: string) {
    const workspace = await this.workspaceRepository.findOne({ where: { id } });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (workspace.ownerId !== ownerId) {
      throw new ForbiddenException('Not authorized to access this workspace');
    }

    return workspace;
  }

  async update(id: string, updates: any, ownerId: string) {
    const workspace = await this.getById(id, ownerId);

    if (updates.name) {
      workspace.name = updates.name;
    }

    if (updates.settings) {
      workspace.settings = { ...workspace.settings, ...updates.settings };
    }

    return this.workspaceRepository.save(workspace);
  }

  async delete(id: string, ownerId: string) {
    const workspace = await this.getById(id, ownerId);
    return this.workspaceRepository.remove(workspace);
  }

  async getWorkspaceStatus(id: string, ownerId: string) {
    const workspace = await this.getById(id, ownerId);

    return {
      id: workspace.id,
      name: workspace.name,
      plan: workspace.plan,
      status: workspace.status,
      leadsGeneratedThisMonth: 0, // Will be calculated from analytics
      apiUsage: {
        used: 0,
        limit: workspace.limits.apiRequests,
      },
      agents: {
        icpAnalysis: { status: 'active', lastRun: new Date() },
        leadSearch: { status: 'running', leadsFound: 0 },
        qualification: { status: 'active', leadsQualified: 0 },
        engagement: { status: 'running', messagesSent: 0 },
        analytics: { status: 'active', lastUpdate: new Date() },
      },
    };
  }

  private getLimitsForPlan(plan: string): any {
    const limits = {
      starter: {
        leadsPerMonth: 1000,
        workspaces: 1,
        icpProfiles: 1,
        apiRequests: 10000,
        dataRetentionDays: 30,
      },
      professional: {
        leadsPerMonth: 10000,
        workspaces: 5,
        icpProfiles: 5,
        apiRequests: 100000,
        dataRetentionDays: 90,
      },
      enterprise: {
        leadsPerMonth: 999999,
        workspaces: 999,
        icpProfiles: 999,
        apiRequests: 999999,
        dataRetentionDays: 365,
      },
    };

    return limits[plan] || limits.starter;
  }
}
