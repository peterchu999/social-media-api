import { MongooseModule } from '@nestjs/mongoose';
import { MonggoDBConfigModule } from '../configs/monggodb/monggodb.config.module';
import { MonggoDBConfigService } from '../configs/monggodb/monggodb.config.service';

export const monggodbProviderInit = () => {
  return MongooseModule.forRootAsync({
    imports: [MonggoDBConfigModule],
    inject: [MonggoDBConfigService],
    useFactory: (configService: MonggoDBConfigService) => {
      return configService.config;
    },
  });
};
