import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('engagement_sequences')
export class EngagementSequence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('uuid')
  leadId: string;

  @Column('varchar')
  campaignId: string;

  @Column('varchar', { enum: ['email', 'linkedin', 'sms', 'multi_touch'], default: 'email' })
  sequenceType: string;

  @Column('varchar', { enum: ['pending', 'in_progress', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Column('jsonb', { default: () => "'[]'" })
  messages: any[];

  @Column('varchar', { nullable: true })
  personalizedContent: string;

  @Column('boolean', { default: false })
  opened: boolean;

  @Column('boolean', { default: false })
  clicked: boolean;

  @Column('boolean', { default: false })
  responded: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  sentAt: Date;

  @Column('timestamp', { nullable: true })
  completedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
