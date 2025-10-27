import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

  @Get()
  getAllTasks(){
    return []
  }

  @Get(':id')
  getTask(@Param('id') id: string){
    return {id}
  }

  @Post()
  createTask(){
    return {}
  }

  @Put(':id')
  updateTask(@Param('id') id: string){
    return {id}
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string){
    return {id}
  }
}
