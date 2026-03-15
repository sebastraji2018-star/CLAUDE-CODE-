import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('analytics_events')
@Index(['workspaceId', 'createdAt'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  eventType: string;

  @Column('uuid', { nullable: true })
  entityId: string;

  @Column('varchar', { nullable: true })
  entityType: string;

  @Column('jsonb', { default: () => "'{}'" })
  data: any;

  @CreateDateColumn()
  createdAt: Date;
}
