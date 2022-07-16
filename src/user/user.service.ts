import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll() {
    return this.users;
  }

  findOne(id: string): User {
    const found = this.users.find((user) => user.id === id);
    return found;
  }

  create(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    const currentDate = Date.now();
    const user: User = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    this.users.push(user);

    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
