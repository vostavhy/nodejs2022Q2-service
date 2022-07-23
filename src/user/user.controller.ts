import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return new User(this.userService.findOne(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return new User(this.userService.create(createUserDto));
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return new User(this.userService.update(id, updatePasswordDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return new User(this.userService.remove(id));
  }
}
