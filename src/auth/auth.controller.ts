import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Public } from './auth.decorators';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('login')
  async signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(createUserDto);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body() token: RefreshTokenDto) {
    const userInfo = await this.authService.getUserIfRefreshTokenMatches(
      token.refreshToken,
    );
    if (userInfo) {
      return this.authService.getNewAccessAndRefreshToken({
        login: userInfo.login,
        userId: userInfo.id,
      });
    } else {
      return null;
    }
  }
}
