import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtBaseStrategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtBaseStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: any): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.username };
  }
}
