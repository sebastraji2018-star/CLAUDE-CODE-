import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompetitorTrackingService } from './competitor-tracking.service';

@Controller('workspaces/:workspaceId')
@UseGuards(AuthGuard('jwt'))
export class CompetitorTrackingController {
  constructor(private readonly competitorTrackingService: CompetitorTrackingService) {}

  // Competitors
  @Get('competitors')
  async getCompetitors(@Param('workspaceId') workspaceId: string) {
    return this.competitorTrackingService.getCompetitors(workspaceId);
  }

  @Post('competitors')
  async addCompetitor(
    @Param('workspaceId') workspaceId: string,
    @Body() body: { name: string; website?: string; industry?: string },
  ) {
    return this.competitorTrackingService.addCompetitor(workspaceId, body);
  }

  @Delete('competitors/:competitorId')
  async removeCompetitor(
    @Param('workspaceId') workspaceId: string,
    @Param('competitorId') competitorId: string,
  ) {
    await this.competitorTrackingService.removeCompetitor(workspaceId, competitorId);
    return { success: true };
  }

  // Benchmark
  @Get('benchmark')
  async getBenchmark(@Param('workspaceId') workspaceId: string) {
    return this.competitorTrackingService.getBenchmarkSummary(workspaceId);
  }

  @Get('benchmark/trends')
  async getTrends(
    @Param('workspaceId') workspaceId: string,
    @Query('days') days: string = '30',
  ) {
    return this.competitorTrackingService.getTrendData(workspaceId, parseInt(days));
  }

  // Insights
  @Get('insights')
  async getInsights(
    @Param('workspaceId') workspaceId: string,
    @Query('limit') limit: string = '7',
  ) {
    return this.competitorTrackingService.getLatestInsights(workspaceId, parseInt(limit));
  }
}
