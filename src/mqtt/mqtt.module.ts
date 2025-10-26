import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [MqttService, { provide: 'PRISMA', useValue: new PrismaClient() }],
  exports: [MqttService],
})
export class MqttModule {}
