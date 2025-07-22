import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
// import { MainSeeder } from './src/db/seeds/main.seeder';
// import { Cat } from './src/cats/entities/cat.entity';
// import { Owner } from './src/owner/entities/owner.entity';
// import { Adoption } from './src/adoption/entities/adoption.entity';
// import { Breed } from './src/breeds/entities/breed.entity';

dotenv.config();

const DB_HOST = process.env.DATABASE_HOST;
const DB_PORT = parseInt(process.env.DATABASE_PORT || '3306', 10);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const options: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['dist/**/*.entity.js'], 
  synchronize: true,
  logging: ['query', 'error'], 

  seeds: ['dist/src/db/seeds/*.seeder.js'], 
  factories: [], 
};

export const AppDataSource = new DataSource(options);