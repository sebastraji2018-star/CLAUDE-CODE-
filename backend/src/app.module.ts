import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from './modules/auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { DataImportModule } from './modules/data-import/data-import.module';
import { ICPModule } from './modules/icp-generation/icp.module';
import { LeadSearchModule } from './modules/lead-search/lead-search.module';
import { LeadQualificationModule } from './modules/lead-qualification/qualification.module';
import { EngagementModule } from './modules/engagement/engagement.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { AgentOrchestratorModule } from './modules/agent-orchestration/orchestration.module';
import { LLMModule } from './llm/llm.module';
import { BrandContextModule } from './modules/brand-context/brand-context.module';
import { CompetitorTrackingModule } from './modules/competitor-tracking/competitor-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'lead_gen_saas',
      entities: ['dist/**/*.entity.js'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),

    // Feature modules
    AuthModule,
    WorkspaceModule,
    DataImportModule,
    ICPModule,
    LeadSearchModule,
    LeadQualificationModule,
    EngagementModule,
    AnalyticsModule,
    IntegrationsModule,
    AgentOrchestratorModule,
    LLMModule,
    BrandContextModule,
    CompetitorTrackingModule,
  ],
})
export class AppModule {}
