import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import jwt_decode from 'jwt-decode';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  async signIn(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = createUserDto;
    const user = await this.userRepository.findOneBy({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login, userId: user.id };
      const accessToken: string = await this.getAccessToken(payload);
      const refreshToken: string = await this.getRefreshToken(payload);

      await this.updateRefreshToken(refreshToken, login);

      return { accessToken, refreshToken };
    } else {
      throw new ForbiddenException('Please check your login credentials');
    }
  }

  async signOut(user: User) {
    await this.updateRefreshToken(null, user.login);
  }

  async getAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY || 'topSecret',
      expiresIn: +process.env.TOKEN_EXPIRE_TIME || 3600,
    });

    return accessToken;
  }

  async getRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'topSecret',
      expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME || 86400,
    });

    return refreshToken;
  }

  async updateRefreshToken(refreshToken: string, login: string) {
    if (refreshToken) {
      // hash
      const salt = await bcrypt.genSalt();
      refreshToken = await bcrypt.hash(refreshToken, salt);
    }
    const updatedUser = await this.userRepository.findOneBy({ login });
    updatedUser.hashedRefreshToken = refreshToken;
    await this.userRepository.save(updatedUser);
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshToken(refreshToken, payload.login);

    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: refreshToken,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string) {
    const decoded: JwtPayload = jwt_decode(refreshToken);
    const { login } = decoded;
    const user: User = await this.userRepository.findOneBy({ login });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshToken(null, login);
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
