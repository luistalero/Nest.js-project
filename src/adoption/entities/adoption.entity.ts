import { Column, Entity } from "typeorm";

@Entity()
export class Adoption {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    catId: number;
    
    @Column()
    ownerId: number;

    @Column()
    adoptionDate: Date;

}
