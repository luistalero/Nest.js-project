import { Adoption } from "src/adoption/entities/adoption.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Owner {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ nullable: true })
    address?: string;

    @OneToMany(() => Adoption, (adoption) => adoption.owner)
    adoptions: Adoption[];

}
