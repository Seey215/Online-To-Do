import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // 初始化日志工具
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
    await app.listen(port);
    logger.log(`Server is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error('Failed to start the server', error.stack);
    process.exit(1);
  }
}

bootstrap();
