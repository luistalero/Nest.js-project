import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { OwnerModule } from './owner/owner.module';
import { AdoptionModule } from './adoption/adoption.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port:  3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BreedsModule,
    OwnerModule,
    AdoptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
