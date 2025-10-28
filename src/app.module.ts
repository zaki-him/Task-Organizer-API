import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv'
import { Task } from './tasks/tasks.entity';
import { User } from './users/user.entity';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'taskDB',
    entities: [Task, User],
    autoLoadEntities: true,
    synchronize: true
  }), TasksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
