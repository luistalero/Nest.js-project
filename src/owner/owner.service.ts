import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {

  @InjectRepository(Owner)
  private readonly ownerRepository: Repository<Owner>;

  constructor() { }

  async create(createOwnerDto: CreateOwnerDto) {
    return await this.ownerRepository.save(createOwnerDto);
  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(id: number) {
    return await this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return await this.ownerRepository.update(id, updateOwnerDto);
  }

  async remove(id: number) {
    return await this.ownerRepository.softDelete(id);
  }
}
