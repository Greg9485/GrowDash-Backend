import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ApiController],
  providers: [{ provide: 'PRISMA', useValue: new PrismaClient() }],
})
export class ApiModule {}
