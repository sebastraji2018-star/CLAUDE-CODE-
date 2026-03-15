import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('historical_customers')
export class HistoricalCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('uuid', { nullable: true })
  importId: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  company: string;

  @Column('varchar', { nullable: true })
  industry: string;

  @Column('varchar', { nullable: true })
  jobTitle: string;

  @Column('varchar', { nullable: true })
  companySize: string;

  @Column('varchar', { nullable: true })
  budgetRange: string;

  @Column('varchar', { nullable: true })
  source: string;

  @Column('varchar', { enum: ['lead', 'customer', 'lost'], default: 'lead' })
  conversionStatus: string;

  @Column('timestamp', { nullable: true })
  conversionDate: Date;

  @Column('integer', { nullable: true })
  dealValue: number;

  @Column('simple-array', { default: () => "''" })
  tags: string[];

  @Column('jsonb', { default: () => "'{}'" })
  additionalData: any;

  @CreateDateColumn()
  createdAt: Date;
}
