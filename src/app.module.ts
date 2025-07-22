import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { OwnerModule } from './owner/owner.module';
import { AdoptionModule } from './adoption/adoption.module';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'mysql_db',
      port:  3306,
      username: process.env.DB_USERNAME || 'user_crud',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'db_crud',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
