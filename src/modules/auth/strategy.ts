import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtBaseStrategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtBaseStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_OR_KEY') || '',
    });
  }

  async validate(payload: any): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.username };
  }
}
