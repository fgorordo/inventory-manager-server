import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { seedUsers } from 'src/seed';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { UserRoles } from './models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userRepository.find()
    const formatedUsers = users.map(user => {
      if (user.refresh_token_hash) {
        user.refresh_token_hash = "logged-in"
      } else {
        user.refresh_token_hash="not-logged-in"
      }
      return user
    })
    return formatedUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createSeed() {
    await this.userRepository.delete({});

    const candidates = seedUsers.map(user => this.userRepository.create(user));
    const devUser = this.userRepository.create({full_name: "Fernando Gorordo", email:"dev@google.com", password: bcrypt.hashSync("123456", 10), role: UserRoles.SUPER_USER})
    
    candidates.forEach(user => user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync()))
    candidates.push(devUser);

    await this.userRepository.save(candidates);
    return;
  }
}
