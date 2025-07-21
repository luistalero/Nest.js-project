// src/database/seeds/breed.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Breed } from '../../breeds/entities/breed.entity'; 

export class BreedSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(Breed);

        const breedsData = [
            { name: 'Siamese' },
            { name: 'Persian' },
            { name: 'Maine Coon' },
            { name: 'Sphynx' },
            { name: 'Bengal' },
            { name: 'Ragdoll' },
            { name: 'British Shorthair' },
            { name: 'Abyssinian' },
            { name: 'Devon Rex' },
            { name: 'Scottish Fold' },
            { name: 'American Shorthair' },
            { name: 'Burmese' },
            { name: 'Russian Blue' },
            { name: 'Siberian' },
            { name: 'Norwegian Forest Cat' },
            { name: 'Himalayan' },
            { name: 'Exotic Shorthair' },
            { name: 'Cornish Rex' },
            { name: 'Oriental Shorthair' },
            { name: 'Tonkinese' },
        ];

        for (const breedData of breedsData) {
            const existingBreed = await repository.findOneBy({ name: breedData.name });
            if (!existingBreed) {
                await repository.save(repository.create(breedData));
                console.log(`Breed: ${breedData.name} creada.`);
            } else {
                console.log(`Breed: ${breedData.name} ya existe.`);
            }
        }
        console.log('Breeds seeded.');
    }
}