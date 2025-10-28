import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  findAllUser(): Promise<User[]>{
    return this.userRepository.find({
      select: ['userId', 'email', 'name' ,'createdAt']
    })
  }

  async findUserById(userId: number): Promise<User>{
    const user = await this.userRepository.findOneBy({ userId })

    if (!user) {
      throw new NotFoundException(`User Not Found`)
    }

    return user
  }

  async findUserByEmail (email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async createUser(userDto: CreateUserDto){
    //Check for any user with the same email
    const user = await this.findUserByEmail(userDto.email)

    if (user) {
      throw new ConflictException('User with this email already exists')
    }

    try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(userDto.password, saltRounds)

      const newUser = await this.userRepository.create({
        ...userDto,
        password: hashedPassword
      })

      const savedUser = await this.userRepository.save(newUser)
      const { password, ...result } = savedUser
      
      return result as User
    } catch (error) {
      throw new BadRequestException('Failed to create user')
    }
  }

  async updateUser(userId: number, userDto: UpdateUserDto){
    const user = await this.userRepository.findOneBy({ userId })

    if (!user) {
      throw new NotFoundException('User Not Found')
    }

    //if changing password => hash the new password
    if (userDto.password) {
      const saltRounds = 10
      userDto.password = await bcrypt.hash(userDto.password, saltRounds)
    }

    Object.assign(user, userDto)
    const savedUser = await this.userRepository.save(user)
    const { password, ...result } = savedUser

    return result as User
  }

  async deleteUser(userId: number): Promise<void>{
    const result = await this.userRepository.delete(userId)

    if (result.affected === 0) {
      throw new NotFoundException(`User Not Found`)
    }
  }
}
