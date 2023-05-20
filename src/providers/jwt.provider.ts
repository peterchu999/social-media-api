import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JWTProviderInit = () => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get<string>('JWT_SECRET_OR_KEY') || '',
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_TTL_SECONDS') || 3600}s`,
        },
      };
    },
  });
};
