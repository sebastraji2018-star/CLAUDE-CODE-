import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('agent_jobs')
export class AgentJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  agentType: string; // 'icp_analysis', 'lead_search', 'qualification', 'engagement', 'optimization'

  @Column('varchar', { enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Column('jsonb', { default: () => "'{}'" })
  config: any;

  @Column('jsonb', { nullable: true })
  result: any;

  @Column('text', { nullable: true })
  error: string;

  @Column('integer', { default: 0 })
  itemsProcessed: number;

  @Column('integer', { default: 0 })
  itemsFailed: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  startedAt: Date;

  @Column('timestamp', { nullable: true })
  completedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
