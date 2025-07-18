import { Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoption } from './entities/adoption.entity';

@Injectable()
export class AdoptionService {

  @InjectRepository(Adoption)
  private readonly adoptionRepository: Repository<Adoption>;

  constructor() { }

  async create(createAdoptionDto: CreateAdoptionDto) {
    return await this.adoptionRepository.save(createAdoptionDto);
  }

  async findAll() {
    return await this.adoptionRepository.find();
  }

  async findOne(id: number) {
    return await this.adoptionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAdoptionDto: UpdateAdoptionDto) {
    return await this.adoptionRepository.update(id, updateAdoptionDto);
  }

  async remove(id: number) {
    return await this.adoptionRepository.softDelete(id);
  }
}
