import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'taskDB',
    autoLoadEntities: true,
    synchronize: true
  }), TasksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
