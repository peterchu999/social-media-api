import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, SignUpRequestDto } from './dtos/requests';
import { LoginResponseDto, SignUpResponseDto } from './dtos/responses';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Get('/')
  async check(): Promise<any> {
    return { success: true, message: 'check called' };
  }

  @ApiOkResponse({
    type: SignUpResponseDto,
  })
  @Post('/sign-up')
  async signup(@Body() data: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signNewuser(data);
  }

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('/login')
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(data);
  }
}
