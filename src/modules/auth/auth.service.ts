import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';
import { LoginRequestDto } from './dtos/requests';
import { LoginResponseDto, SignUpResponseDto } from './dtos/responses';
import { User } from 'src/schemas/User.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signNewuser(data: LoginRequestDto): Promise<SignUpResponseDto> {
    const saltOrRound = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(data.password, saltOrRound);

    const users = await this.userService.createUser({
      ...data,
      password: encryptedPassword,
    });

    return plainToInstance(SignUpResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isPassword = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    if (isPassword) {
      return user;
    }

    return null;
  }

  async login({
    username,
    password,
  }: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(username, password);

    const payload = { username: user.username, sub: user._id.toString() };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
