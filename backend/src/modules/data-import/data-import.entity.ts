import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('data_imports')
export class DataImport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('varchar')
  fileName: string;

  @Column('varchar', { enum: ['csv', 'json', 'excel'] })
  fileType: string;

  @Column('integer')
  totalRecords: number;

  @Column('integer', { default: 0 })
  successfulRecords: number;

  @Column('integer', { default: 0 })
  failedRecords: number;

  @Column('varchar', { enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Column('jsonb', { nullable: true })
  errors: any;

  @Column('jsonb', { default: () => "'{}'" })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  completedAt: Date;
}
