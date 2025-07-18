import e from "express";
import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Cat {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;
    
    @Column()
    age: number;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true,
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    breed: Breed;

    @DeleteDateColumn()
    deletedAt: Date;

}
