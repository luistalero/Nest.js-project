import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adoption } from './entities/adoption.entity';
import { Cat } from 'src/cats/entities/cat.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AdoptionService {

  constructor(
  @InjectRepository(Adoption)
  private readonly adoptionRepository: Repository<Adoption>,
  @InjectRepository(Cat)
  private readonly catRepository: Repository<Cat>,
  @InjectRepository(Owner)
  private readonly ownerRepository: Repository<Owner>,
  ) { }

  async create(createAdoptionDto: CreateAdoptionDto) {
    const cat = await this.catRepository.findOneBy({ id: createAdoptionDto.catId});
    if(!cat) {
      throw new NotFoundException(`Cat with ID ${createAdoptionDto.catId} Not Found`);
    }

    const owner = await this.ownerRepository.findOneBy({ id: createAdoptionDto.ownerId});
    if(!owner) {
      throw new NotFoundException(`Owner with ID ${createAdoptionDto.ownerId} Not Found`);
    }

    const newAdoption = this.adoptionRepository.create({
      cat: cat,
      owner: owner,
      adoptionDate: createAdoptionDto.adoptionDate,
    });

    return await this.adoptionRepository.save(newAdoption);
  }

  async findAll() {
    return await this.adoptionRepository.find({ relations: ['cat', 'owner'] });
  }

  async findOne(id: number) {
    const adoption = await this.adoptionRepository.findOne({ where: { id }, relations: ['cat', 'owner'] });
    if(!adoption) {
      throw new NotFoundException(`Adoption with ID ${id} not found`);
    }
    return adoption;
  }

  async update(id: number, updateAdoptionDto: UpdateAdoptionDto) {
    const adoption = await this.adoptionRepository.findOneBy({ id });
  
    if (!adoption) {
      throw new NotFoundException(`Adoption with ID ${id} not found`);
    }

    let updatedCat = adoption.cat; 
    if (updateAdoptionDto.catId) {
      const cat = await this.catRepository.findOneBy({ id: updateAdoptionDto.catId });
      if (!cat) {
        throw new NotFoundException(`Cat with ID ${updateAdoptionDto.catId} not found`);
      }
      updatedCat = cat;
    }

    let updatedOwner = adoption.owner; 
    if (updateAdoptionDto.ownerId) {
      const owner = await this.ownerRepository.findOneBy({ id: updateAdoptionDto.ownerId });
      if (!owner) {
        throw new NotFoundException(`Owner with ID ${updateAdoptionDto.ownerId} not found`);
      }
      updatedOwner = owner;
    }

    const adoptionToUpdate: Partial<Adoption> = {
      ...adoption, 
      adoptionDate: updateAdoptionDto.adoptionDate ?? adoption.adoptionDate, 
      cat: updatedCat, 
      owner: updatedOwner, 
    };
  
    return await this.adoptionRepository.save(adoptionToUpdate);
  }

  async remove(id: number) {
    const result = await this.adoptionRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Adoption with ID ${id} not found`);
    }
    return { message: `Adoption with ID ${id} soft deleted successfully` };
  }
}
