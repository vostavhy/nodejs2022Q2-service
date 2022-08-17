import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY || 'topSecret',
    });
  }

  async validate(payload: JwtPayload) {
    const { login } = payload;
    const user = await this.userRepository.findOneBy({ login });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
