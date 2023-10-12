import 'dotenv/config'
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: +process.env.POSTGRESQL_PORT,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ]
})
export class AppModule {

}
