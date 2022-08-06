import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ unique: true }) should comment for tests passing
  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: number; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: number; // timestamp of last update

  @Column({ nullable: true })
  @Exclude()
  public hashedRefreshToken?: string;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;

    return {
      id,
      login,
      version,
      createdAt: new Date(createdAt).getTime(),
      updatedAt: new Date(updatedAt).getTime(),
    };
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
