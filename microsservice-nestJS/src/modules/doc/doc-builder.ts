import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Project Knowledge - microsservice')
  .setDescription('API Rest - NestJS')
  .setVersion('1.0')
  .build();
