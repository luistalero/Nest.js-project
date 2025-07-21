// src/database/seeds/adoption.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Adoption } from '../../adoption/entities/adoption.entity'; 
import { Cat } from '../../cats/entities/cat.entity';  
import { Owner } from '../../owner/entities/owner.entity';  
import { faker } from '@faker-js/faker';

export class AdoptionSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const adoptionRepository = dataSource.getRepository(Adoption);
        const catRepository = dataSource.getRepository(Cat);
        const ownerRepository = dataSource.getRepository(Owner);

        const cats = await catRepository.find();
        const owners = await ownerRepository.find();

        if (cats.length === 0 || owners.length === 0) {
            console.warn('¡Advertencia! No se encontraron gatos y/o dueños. Asegúrate de que CatSeeder y OwnerSeeder se ejecutaron primero.');
            return;
        }

        const numberOfAdoptionsToCreate = Math.min(cats.length, owners.length, 30); 
        for (let i = 0; i < numberOfAdoptionsToCreate; i++) {
            const randomCat = cats[Math.floor(Math.random() * cats.length)];
            const randomOwner = owners[Math.floor(Math.random() * owners.length)];

            const existingAdoption = await adoptionRepository.findOne({
                where: {
                    cat: { id: randomCat.id },
                    owner: { id: randomOwner.id }
                }
            });

            if (!existingAdoption) {
                const adoptionData = adoptionRepository.create({
                    cat: randomCat,
                    owner: randomOwner, 
                    adoptionDate: faker.date.recent({ days: 365, refDate: new Date() }),
                });

                await adoptionRepository.save(adoptionData);
                console.log(`Adopción creada: Gato ${randomCat.name} adoptado por ${randomOwner.firstName}`);
            } else {
                console.log(`Adopción para Gato ${randomCat.name} y Dueño ${randomOwner.firstName} ya existe. Saltando.`);
            }
        }
        console.log('Adoptions seeded.');
    }
}