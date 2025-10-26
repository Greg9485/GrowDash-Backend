import { Module } from '@nestjs/common';
import { IngestModule } from './ingest/ingest.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ApiModule } from './api/api.module';
import { SensorsModule } from './sensors/sensors.module';
import { SensorsService } from './sensors/sensors.service';
import { SensorsController } from './sensors/sensors.controller';

@Module({
  imports: [MqttModule, IngestModule, ApiModule],
  providers: [SensorsService],
  controllers: [SensorsController],
})
export class AppModule {}
