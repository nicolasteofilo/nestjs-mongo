import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'CRUD API with Mongo Docs',
  };

  const config = new DocumentBuilder()
    .setTitle('CRUD user with Mongo')
    .setDescription('The CRUD user API with Mongo')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(3000);
  console.log('Application is running on: 3000');
}
bootstrap();
