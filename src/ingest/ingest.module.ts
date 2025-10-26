import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [IngestController],
  providers: [IngestService, { provide: 'PRISMA', useValue: new PrismaClient() }],
  exports: [IngestService]
})
export class IngestModule {}
