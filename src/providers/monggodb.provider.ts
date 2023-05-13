import { MongooseModule } from '@nestjs/mongoose';
import { MonggoDBConfigModule } from 'src/configs/monggodb/monggodb.config.module';
import { MonggoDBConfigService } from 'src/configs/monggodb/monggodb.config.service';

export const monggodbProviderInit = () => {
  return MongooseModule.forRootAsync({
    imports: [MonggoDBConfigModule],
    inject: [MonggoDBConfigService],
    useFactory: (configService: MonggoDBConfigService) => {
      return configService.config;
    },
  });
};
