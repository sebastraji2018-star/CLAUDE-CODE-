import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('icp_profiles')
export class ICPProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('jsonb', { default: () => "'{}'" })
  characteristics: {
    industries: string[];
    companySizes: string[];
    jobTitles: string[];
    budgetRange: { min: number; max: number };
    painPoints: string[];
    buyingSignals: string[];
  };

  @Column('jsonb', { default: () => "'{}'" })
  scoringRules: any;

  @Column('varchar', { enum: ['draft', 'active', 'archived'], default: 'draft' })
  status: string;

  @Column('integer', { default: 1 })
  version: number;

  @Column('boolean', { default: false })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
