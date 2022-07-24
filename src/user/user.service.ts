import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
//import { DBService } from 'src/db/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    //private db: DBService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create(createUserDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const found = await this.getUser(id);
    return found.toResponse();
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const updatedUser = await this.getUser(id);
    if (oldPassword !== updatedUser.password) {
      throw new ForbiddenException();
    }
    updatedUser.password = newPassword;
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const found = this.findOne(id);
    await this.userRepository.delete(id);
    return found;
  }

  private async getUser(id: string) {
    const found = await this.userRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  //createOld(createUserDto: CreateUserDto): User {
  //  const { login, password } = createUserDto;
  //  const currentDate = Date.now();
  //  const user: User = {
  //    id: uuid(),
  //    login,
  //    password,
  //    version: 1,
  //    createdAt: currentDate,
  //    updatedAt: currentDate,
  //  };
  //  this.db.users.push(user);
  //  return user;
  //}

  //update(id: string, updatePasswordDto: UpdatePasswordDto): User {
  //  const { oldPassword, newPassword } = updatePasswordDto;
  //  const user = this.findOne(id);
  //  if (oldPassword !== user.password) {
  //    throw new ForbiddenException();
  //  }
  //  user.password = newPassword;
  //  user.version += 1;
  //  user.updatedAt = Date.now();
  //  return user;
  //}

  //remove(id: string): User {
  //  const user = this.findOne(id);
  //  this.db.users = this.db.users.filter((user) => user.id !== id);
  //  return user;
  //}
}
