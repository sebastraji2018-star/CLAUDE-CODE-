import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competitor } from './competitor.entity';
import { CompetitiveSnapshot } from './competitive-snapshot.entity';
import { CompetitorTrackingService } from './competitor-tracking.service';
import { CompetitorTrackingController } from './competitor-tracking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Competitor, CompetitiveSnapshot])],
  providers: [CompetitorTrackingService],
  controllers: [CompetitorTrackingController],
  exports: [CompetitorTrackingService],
})
export class CompetitorTrackingModule {}
