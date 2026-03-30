import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('brand_contexts')
@Index(['workspaceId'], { unique: true })
export class BrandContext {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  brandName: string;

  @Column('varchar')
  industry: string;

  @Column('text')
  valueProposition: string;

  @Column('text')
  targetAudience: string;

  @Column('jsonb', { default: () => "'[]'" })
  competitors: string[];

  @Column('jsonb', { default: () => "'[]'" })
  keyMetrics: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
