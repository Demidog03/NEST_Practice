import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './create-user.dto'
import { RolesService } from '../roles/roles.service';
import {AssignRoleDto} from "./assign-role.dto";
import {BanUserDto} from "./ban-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.rolesService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }
  async getAllUser() {
    return await this.userRepository.findAll({include: {all: true}})
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({where: {email}, include: {all: true}})
  }

  async assignRole(dto: AssignRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)
    if(!user && !role) {
      throw new HttpException('User and role is not found', HttpStatus.NOT_FOUND)
    }
    else if(!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }
    else if(!role) {
      throw new HttpException('Role is not found', HttpStatus.NOT_FOUND)
    }
    await user.$add('roles', role.id)
    return dto
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if(!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.reason
    await user.save()
    return user
  }
}
