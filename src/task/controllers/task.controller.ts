import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common'
import { CreateTaskDto } from '../dto/create-task.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard'
import { TaskService } from '~/task/services/task.service'
import * as _ from 'lodash'
import { SuccessDataResponse } from '~/common/contracts/dto'
import { TaskPriority, TaskStatus } from '~/common/contracts/constant'
import { ParseObjectIdPipe } from '~/common/pipes/parse-object-id.pipe'

@Controller('task')
@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard.TOKEN)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({ type: SuccessDataResponse })
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, _.get(req, 'user._id'))
  }

  @Get('/')
  @ApiQuery({ name: 'status', required: false, enum: TaskStatus })
  @ApiQuery({ name: 'priority', required: false, enum: TaskPriority })
  findAll(@Req() req, @Query('status') status?: TaskStatus, @Query('priority') priority?: TaskPriority) {
    return this.taskService.findAll({
      createdBy: _.get(req, 'user._id'),
      priority: priority,
      status: status
    })
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string, @Req() req) {
    return this.taskService.findOne({
      createdBy: _.get(req, 'user._id'),
      _id: id
    })
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    return this.taskService.update(_.get(req, 'user._id'), id, updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string, @Req() req) {
    return this.taskService.remove(_.get(req, 'user._id'), id)
  }
}
