import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm'

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

  create(task: Partial<Task>): Promise<Task>{
    const newTask = this.taskRepository.create(task)
    return this.taskRepository.save(newTask)
  }

  async update(id: number, data: Partial<Task>): Promise<Task>{
    const task = await this.taskRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundException(`Task Not Found, id: ${id}`)
    }

    Object.assign(task, data)
    return this.taskRepository.save(task)
  }

  async delete(id: number): Promise<Task>{
    const task = await this.taskRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundException(`Task Not Found, id: ${id}`)
    }

    return this.taskRepository.remove(task)
  }
}
