// src/database/seeds/main.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import { BreedSeeder } from './breeds.seeder';
import { OwnerSeeder } from './owners.seeder';
import { CatSeeder } from './cats.seeder';
import { AdoptionSeeder } from './adoptions.seeders';

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        console.log('--- Iniciando Seeding Principal ---');

        await runSeeder(dataSource, BreedSeeder);
        await runSeeder(dataSource, OwnerSeeder);
        await runSeeder(dataSource, CatSeeder);
        await runSeeder(dataSource, AdoptionSeeder); 

        console.log('--- Seeding Principal Finalizado ---');
    }
}