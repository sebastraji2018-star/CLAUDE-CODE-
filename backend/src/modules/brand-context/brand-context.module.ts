import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandContext } from './brand-context.entity';
import { BrandContextService } from './brand-context.service';
import { BrandContextController } from './brand-context.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BrandContext])],
  providers: [BrandContextService],
  controllers: [BrandContextController],
  exports: [BrandContextService],
})
export class BrandContextModule {}
