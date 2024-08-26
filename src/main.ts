import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle("Ecommers PI M4 BACK")
  .setDescription("Servidor de Ecommerse - Permite registrar, eliminar y modificar los usuarios, products, ordenes y archivos")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

  const Document = SwaggerModule.createDocument(app, swaggerConfig)
  
  SwaggerModule.setup("documentation", app, Document)
  app.use(loggerMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
