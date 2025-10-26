import { Controller, Post, Body } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('api/ingest')
export class IngestController {
  constructor(private readonly ingest: IngestService) {}

  @Post('http')
  async httpIngest(@Body() payload: any) {
    // payload: { deviceId, ts, readings: {temp:23.1, rh:50} }
    return this.ingest.handleHttp(payload);
  }
}
