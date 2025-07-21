import { Adoption } from "src/adoption/entities/adoption.entity";
import { Breed } from "src/breeds/entities/breed.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Breed, (breed) => breed.cats, {
    eager: true, 
  })
  breed: Breed;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Adoption, (adoption) => adoption.cat)
  adoptions: Adoption[];
}