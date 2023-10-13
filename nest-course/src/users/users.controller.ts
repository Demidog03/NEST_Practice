import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AssignRoleDto} from "./assign-role.dto";
import {BanUserDto} from "./ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'User creation'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Getting all users'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.usersService.getAllUser()
  }

  @ApiOperation({summary: 'Assign role'})
  @ApiResponse({status: 200})
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/role')
  assignRole(@Body() dto: AssignRoleDto) {
    return this.usersService.assignRole(dto)
  }

  @ApiOperation({summary: 'Ban user'})
  @ApiResponse({status: 200})
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto)
  }
}
