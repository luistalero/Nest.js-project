import { Column, DeleteDateColumn, Entity } from "typeorm";

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
    phone: number ;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ nullable: true })
    address?: string;

}
