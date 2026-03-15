import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DataImportService } from './data-import.service';

@Controller('workspaces/:workspaceId/data-import')
@UseGuards(AuthGuard('jwt'))
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Post('upload')
  async uploadData(
    @Param('workspaceId') workspaceId: string,
    @Body() body: { fileName: string; fileType: string; records: any[] },
  ) {
    return this.dataImportService.importData(workspaceId, body.fileName, body.fileType, body.records);
  }

  @Get('history')
  async getHistory(@Param('workspaceId') workspaceId: string) {
    return this.dataImportService.getImportHistory(workspaceId);
  }

  @Get(':importId')
  async getImportDetails(
    @Param('workspaceId') workspaceId: string,
    @Param('importId') importId: string,
  ) {
    return this.dataImportService.getImportDetails(workspaceId, importId);
  }
}
