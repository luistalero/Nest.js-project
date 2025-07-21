// src/database/seeds/cat.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Cat } from '../../cats/entities/cat.entity';
import { Breed } from '../../breeds/entities/breed.entity';
import { faker } from '@faker-js/faker';

export class CatSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const catRepository = dataSource.getRepository(Cat);
        const breedRepository = dataSource.getRepository(Breed);

        const breeds = await breedRepository.find();
        if (breeds.length === 0) {
            console.warn('¡Advertencia! No se encontraron razas. Asegúrate de que BreedSeeder se ejecutó.');
            return;
        }

        for (let i = 0; i < 100; i++) { 
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
            const catData = {
                name: faker.animal.cat(),
                age: faker.number.int({ min: 1, max: 18 }),
                breed: randomBreed,
            };
            const existingCat = await catRepository.findOneBy({ name: catData.name });
            if (!existingCat) {
                await catRepository.save(catRepository.create(catData));
                console.log(`Cat: ${catData.name} (${randomBreed.name}) creado.`);
            } else {
                console.log(`Cat: ${catData.name} ya existe.`);
            }
        }
        console.log('Cats seeded.');
    }
}