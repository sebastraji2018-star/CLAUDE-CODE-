import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandContext } from './brand-context.entity';

@Injectable()
export class BrandContextService {
  constructor(
    @InjectRepository(BrandContext)
    private brandContextRepository: Repository<BrandContext>,
  ) {}

  async createOrUpdate(workspaceId: string, data: Partial<BrandContext>): Promise<BrandContext> {
    const existing = await this.brandContextRepository.findOne({ where: { workspaceId } });

    if (existing) {
      Object.assign(existing, data);
      return this.brandContextRepository.save(existing);
    }

    const context = this.brandContextRepository.create({ ...data, workspaceId });
    return this.brandContextRepository.save(context);
  }

  async getBrandContext(workspaceId: string): Promise<BrandContext | null> {
    return this.brandContextRepository.findOne({ where: { workspaceId } });
  }

  async update(workspaceId: string, data: Partial<BrandContext>): Promise<BrandContext> {
    const context = await this.getBrandContext(workspaceId);
    if (!context) throw new NotFoundException('Brand context not found');
    Object.assign(context, data);
    return this.brandContextRepository.save(context);
  }
}
