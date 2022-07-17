import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User, UserWithoutPassword } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll() {
    const usersWP: UserWithoutPassword[] = this.users.map((user) =>
      this.deletePassword(user),
    );
    return usersWP;
  }

  findOne(id: string): User {
    const found = this.users.find((user) => user.id === id);
    return found;
  }

  // return User without password
  getOne(id: string): UserWithoutPassword {
    const found: User = this.findOne(id);
    return this.deletePassword(found);
  }

  create(createUserDto: CreateUserDto): UserWithoutPassword {
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
    return this.deletePassword(user);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserWithoutPassword {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return this.deletePassword(user);
  }

  remove(id: string): UserWithoutPassword {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return this.deletePassword(user);
  }

  private deletePassword(obj: User) {
    const newObj = Object.assign({}, obj);
    delete newObj.password;
    return newObj;
  }
}
