import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserWithoutPassword } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): UserWithoutPassword[] {
    return this.userService.findAll();
  }
}
