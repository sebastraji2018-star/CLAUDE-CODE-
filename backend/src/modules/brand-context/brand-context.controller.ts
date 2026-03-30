import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandContextService } from './brand-context.service';

@Controller('workspaces/:workspaceId/brand-context')
@UseGuards(AuthGuard('jwt'))
export class BrandContextController {
  constructor(private readonly brandContextService: BrandContextService) {}

  @Post()
  async createOrUpdate(
    @Param('workspaceId') workspaceId: string,
    @Body() body: {
      brandName: string;
      industry: string;
      valueProposition: string;
      targetAudience: string;
      competitors: string[];
      keyMetrics: string[];
    },
  ) {
    return this.brandContextService.createOrUpdate(workspaceId, body);
  }

  @Get()
  async getBrandContext(@Param('workspaceId') workspaceId: string) {
    return this.brandContextService.getBrandContext(workspaceId);
  }

  @Put()
  async update(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Partial<{
      brandName: string;
      industry: string;
      valueProposition: string;
      targetAudience: string;
      competitors: string[];
      keyMetrics: string[];
    }>,
  ) {
    return this.brandContextService.update(workspaceId, body);
  }
}
