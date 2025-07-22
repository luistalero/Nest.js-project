import { Cat } from "src/cats/entities/cat.entity";
import { Owner } from "src/owner/entities/owner.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Adoption {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cat, (cat) => cat.adoptions, {
        eager: true,
    })
    cat: Cat;
    
    @ManyToOne(() => Owner, (owner) => owner.adoptions, {
        eager: true,
    })
    owner: Owner;

    @Column()
    adoptionDate: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}

