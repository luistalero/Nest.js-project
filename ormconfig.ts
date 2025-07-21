import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './src/db/seeds/main.seeder';
import { Cat } from './src/cats/entities/cat.entity';
import { Owner } from './src/owner/entities/owner.entity';
import { Adoption } from './src/adoption/entities/adoption.entity';
import { Breed } from './src/breeds/entities/breed.entity';

const DB_HOST = process.env.DB_HOST_INTERNAL || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT_INTERNAL || '3306', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'user_crud';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_DATABASE = process.env.DB_DATABASE || 'db_crud';

const options: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Cat, Owner, Adoption, Breed], 
  synchronize: true,
  logging: ['query', 'error'], 

  seeds: [MainSeeder], 
  factories: [], 
};

export const AppDataSource = new DataSource(options);