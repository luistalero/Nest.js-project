import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto'; 
import { UpdateCatDto } from './dto/update-cat.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    let breed: Breed | undefined | null; 

    if (createCatDto.breedId) {
      breed = await this.breedRepository.findOneBy({
        id: createCatDto.breedId,
      });

      if (!breed) {
        throw new BadRequestException(`Breed with ID ${createCatDto.breedId} not found`);
      }
    }

    const cat = this.catRepository.create({
      name: createCatDto.name,
      age: createCatDto.age,
      breed: breed || undefined,
    });
    return await this.catRepository.save(cat);
  }


  async findAll() {
    return await this.catRepository.find({ relations: ['breed'] });
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOne({ where: { id }, relations: ['breed'] });
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({ id });
  
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  
    let updatedBreed: Breed | undefined = cat.breed; 
    if (updateCatDto.breedId) { 
      const breed = await this.breedRepository.findOneBy({
        id: updateCatDto.breedId, 
      });
  
      if (!breed) {
        throw new BadRequestException(`Breed with ID ${updateCatDto.breedId} not found`);
      }
      updatedBreed = breed; 
    }
  
    const catToSave: Partial<Cat> = {
      ...cat, 
      name: updateCatDto.name ?? cat.name,
      age: updateCatDto.age ?? cat.age,  
      breed: updatedBreed, 
    };
  
    return await this.catRepository.save(catToSave);
  }

  async remove(id: number) {
    const result = await this.catRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return { message: `Cat with ID ${id} soft deleted successfully` };
  }
}
