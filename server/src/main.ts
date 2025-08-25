import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const DOCS_PATH = '/docs';

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PDR API')
    .setDescription('Official API for revisao.pro platform')
    .setVersion('1.0')
    .addTag('revisao')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    DOCS_PATH,
    apiReference({
      content: document,
      theme: 'deepSpace',
    }),
  );

  app.use(bodyParser.json());

  await app.listen(PORT);

  console.log(`Server is running on port ${PORT}`);
  console.log(`Docs: http://localhost:${PORT}${DOCS_PATH}`);
}
bootstrap();
