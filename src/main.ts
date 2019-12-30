import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API de Vendas')
    .setDescription('Trabalho de Pós-Graduação da Uni-FACEF')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('', app, document);

  const port: number = 3000;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}/`)
}

bootstrap();
