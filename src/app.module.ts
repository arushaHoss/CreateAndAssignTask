import { Module } from '@nestjs/common';
import "dotenv/config";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../../migrations-dir/*.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
      // ssl: {
      //   rejectUnauthorized: true,
      // },
    }),
    UserModule,
    AuthModule,
    TeamModule,
    TaskModule
    // entities: [User]
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
