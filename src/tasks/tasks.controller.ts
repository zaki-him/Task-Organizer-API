import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService){}

  @Get()
  getAllTasks(): Promise<Task[]>{
    return this.taskService.findAll()
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task>{
    return this.taskService.findById(id)
  }

  @Post()
  createTask(@Body(new ValidationPipe()) createTask: CreateTaskDto){
    return this.taskService.create(createTask)
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto){
    return this.taskService.update(id, data)
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number){
    return this.taskService.delete(id)
  }
}
