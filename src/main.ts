import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Social Media API')
    .setDescription(
      'Social media platform using NestJS, MongoDB, and AWS. The platform allows users to create posts, follow other users, like and comment on posts, and search for posts using keywords',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./docs/swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
