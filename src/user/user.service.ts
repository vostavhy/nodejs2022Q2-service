import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { DBService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  findAll() {
    return this.db.users;
  }

  findOne(id: string): User {
    const found = this.db.users.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException();
    }
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
    this.db.users.push(user);
    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);
    if (oldPassword !== user.password) {
      throw new ForbiddenException();
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string): User {
    const user = this.findOne(id);
    this.db.users = this.db.users.filter((user) => user.id !== id);
    return user;
  }
}
