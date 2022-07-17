import { OmitType } from '@nestjs/mapped-types';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class UserWithoutPassword extends OmitType(User, ['password']) {}
