import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WorkspaceService } from './workspace.service';

@Controller('workspaces')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post()
  async create(@Body() body: { name: string; plan?: string }, @Req() req) {
    return this.workspaceService.create(req.user.userId, body.name, body.plan);
  }

  @Get()
  async getByOwner(@Req() req) {
    return this.workspaceService.getByOwner(req.user.userId);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Req() req) {
    return this.workspaceService.getById(id, req.user.userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.workspaceService.update(id, body, req.user.userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.workspaceService.delete(id, req.user.userId);
  }

  @Get(':id/status')
  async getStatus(@Param('id') id: string, @Req() req) {
    return this.workspaceService.getWorkspaceStatus(id, req.user.userId);
  }
}
