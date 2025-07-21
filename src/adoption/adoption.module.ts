import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';
import { OwnerModule } from 'src/owner/owner.module';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), OwnerModule, CatsModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: []
})
export class AdoptionModule {}
