// src/database/seeds/owner.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Owner } from '../../owner/entities/owner.entity';
import { faker } from '@faker-js/faker';

export class OwnerSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(Owner);

        for (let i = 0; i < 50; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName }).toLowerCase();
            const phone = faker.string.numeric(10);
            const address = faker.location.streetAddress(true);

            const ownerData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
            };

            const existingOwner = await repository.findOneBy({ email: ownerData.email });

            if (!existingOwner) {
                await repository.save(repository.create(ownerData));
                console.log(`Owner: ${ownerData.firstName} ${ownerData.lastName} creado.`);
            } else {
                console.log(`Owner: ${ownerData.firstName} ${ownerData.lastName} ya existe (email: ${ownerData.email}).`);
            }
        }
        console.log('Owners seeded.');
    }
}