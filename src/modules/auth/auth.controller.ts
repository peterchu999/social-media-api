import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, SignUpRequestDto } from './dtos/requests';
import { LoginResponseDto, SignUpResponseDto } from './dtos/responses';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Post('/sign-up')
  async signup(@Body() data: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signNewuser(data);
  }

  @Post('/login')
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(data);
  }
}
