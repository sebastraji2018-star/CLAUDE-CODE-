import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('competitive_snapshots')
@Index(['workspaceId', 'snapshotDate'])
@Index(['workspaceId', 'competitorId'])
export class CompetitiveSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('uuid', { nullable: true })
  competitorId: string; // null = own brand

  @Column('date')
  snapshotDate: string;

  @Column('float', { default: 0 })
  marketPositionScore: number; // 0-100

  @Column('float', { default: 0 })
  shareOfVoice: number; // 0-100 percentage

  @Column('float', { default: 0 })
  pricingIndex: number; // relative to market avg

  @Column('float', { default: 0 })
  featureScore: number; // product completeness 0-100

  @Column('float', { default: 0 })
  sentimentScore: number; // brand sentiment 0-100

  @Column('jsonb', { default: () => "'{}'" })
  details: Record<string, any>;

  @Column('text', { nullable: true })
  aiInsights: string;

  @CreateDateColumn()
  createdAt: Date;
}
