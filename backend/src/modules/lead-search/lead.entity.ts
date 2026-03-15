import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('leads')
@Index(['workspaceId', 'email'], { unique: true })
@Index(['workspaceId', 'status'])
@Index(['workspaceId', 'qualificationScore'])
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar')
  company: string;

  @Column('varchar', { nullable: true })
  jobTitle: string;

  @Column('varchar', { nullable: true })
  industry: string;

  @Column('varchar', { nullable: true })
  companySize: string;

  @Column('varchar', { nullable: true })
  location: string;

  @Column('varchar', { nullable: true })
  linkedinUrl: string;

  @Column('jsonb', { default: () => "'{}'" })
  enrichmentData: any;

  @Column('varchar', { enum: ['pending', 'completed', 'failed'], default: 'pending' })
  enrichmentStatus: string;

  @Column('integer', { default: 0 })
  qualificationScore: number;

  @Column('integer', { default: 0 })
  icpMatchPercentage: number;

  @Column('varchar', { enum: ['unqualified', 'qualified', 'hot'], default: 'unqualified' })
  qualificationStatus: string;

  @Column('varchar')
  source: string;

  @Column('varchar', { enum: ['new', 'contacted', 'responded', 'qualified', 'converted', 'lost'], default: 'new' })
  status: string;

  @CreateDateColumn()
  discoveredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
