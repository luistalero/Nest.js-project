import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Adoption]) 
  ],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
