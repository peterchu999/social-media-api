import { Module } from '@nestjs/common';
import { MonggoDBConfigService } from './monggodb.config.service';

@Module({
  providers: [MonggoDBConfigService],
  exports: [MonggoDBConfigService],
})
export class MonggoDBConfigModule {}
