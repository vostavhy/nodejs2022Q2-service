import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let createdUser = this.userRepository.create({
      login,
      password: hashedPassword,
    });

    try {
      createdUser = await this.userRepository.save(createdUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return createdUser.toResponse();
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
    if (!(await bcrypt.compare(oldPassword, updatedUser.password))) {
      throw new ForbiddenException();
    }

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    updatedUser.password = hashedPassword;

    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async remove(id: string) {
    const user = await this.getUser(id);
    await this.userRepository.delete(id);
    return user;
  }

  private async getUser(id: string) {
    const found = await this.userRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
