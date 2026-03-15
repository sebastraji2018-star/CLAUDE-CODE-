import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICPService } from './icp.service';

@Controller('workspaces/:workspaceId/icp')
@UseGuards(AuthGuard('jwt'))
export class ICPController {
  constructor(private icpService: ICPService) {}

  @Post('generate')
  async generateICP(
    @Param('workspaceId') workspaceId: string,
    @Body() body: { name: string },
  ) {
    return this.icpService.generateICP(workspaceId, body.name);
  }

  @Get()
  async getICPs(@Param('workspaceId') workspaceId: string) {
    return this.icpService.getICPs(workspaceId);
  }

  @Get('active')
  async getActiveICP(@Param('workspaceId') workspaceId: string) {
    return this.icpService.getActiveICP(workspaceId);
  }

  @Put(':icpId/activate')
  async activateICP(
    @Param('workspaceId') workspaceId: string,
    @Param('icpId') icpId: string,
  ) {
    return this.icpService.activateICP(workspaceId, icpId);
  }

  @Put(':icpId')
  async updateICP(
    @Param('workspaceId') workspaceId: string,
    @Param('icpId') icpId: string,
    @Body() body: any,
  ) {
    return this.icpService.updateICP(workspaceId, icpId, body);
  }

  @Delete(':icpId')
  async deleteICP(
    @Param('workspaceId') workspaceId: string,
    @Param('icpId') icpId: string,
  ) {
    return this.icpService.deleteICP(workspaceId, icpId);
  }
}
