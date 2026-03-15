import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  ownerId: string;

  @Column({ type: 'enum', enum: ['starter', 'professional', 'enterprise'], default: 'starter' })
  plan: string;

  @Column({ type: 'enum', enum: ['active', 'suspended', 'trial_expired'], default: 'active' })
  status: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  settings: any;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  limits: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
