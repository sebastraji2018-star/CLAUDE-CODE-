import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('competitors')
@Index(['workspaceId'])
export class Competitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  website: string;

  @Column('varchar', { nullable: true })
  industry: string;

  @Column('jsonb', { default: () => "'{}'" })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
