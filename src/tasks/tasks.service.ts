import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm'
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ){}

  findAll(): Promise<Task[]>{
    return this.taskRepository.find()
  }

  async findById(id: number): Promise<Task>{
    const task = await this.taskRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundException(`Task Not Found, id:${id}`)
    }

    return task
  }

  async create(task: CreateTaskDto): Promise<Task>{
    try {
      const newTask = this.taskRepository.create(task)
      return await this.taskRepository.save(newTask)
    } catch (error) {
      throw new BadRequestException('Failed to create the task')
    }
  }

  async update(id: number, data: UpdateTaskDto): Promise<Task>{
    const result = await this.taskRepository.update(id, data)

    if (result.affected === 0) {
      throw new NotFoundException(`Task Not Found, id: ${id}`)
    }

    return this.findById(id)
  }

  async delete(id: number): Promise<void>{
    const task = await this.taskRepository.delete(id)

    if(task.affected === 0){
      throw new NotFoundException(`Task Not Found, id: ${id}`)
    }
  }
}
