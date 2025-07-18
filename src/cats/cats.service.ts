import { BadRequestException, Injectable } from '@nestjs/common';
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
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>

  ) { }

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findOneBy({ id });
  
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
  
    let breed;
    if (updateCatDto.breed) {
      breed = await this.breedsRepository.findOneBy({
        name: updateCatDto.breed,
      });
  
      if (!breed) {
        throw new BadRequestException('Breed not found');
      }
    }
  
    return await this.catRepository.save({
      ...cat,
      ...updateCatDto,
      breed,
    });
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id);
  }
}
