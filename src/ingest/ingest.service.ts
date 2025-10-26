import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class IngestService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  async handleHttp(payload: any) {
    const { deviceId, ts, readings } = payload;
    if (!deviceId) return { ok: false, error: 'deviceId required' };

    let device = await this.prisma.device.findUnique({ where: { deviceId } });
    if (!device) {
      device = await this.prisma.device.create({ data: { deviceId } });
    }

    const entries = Object.entries(readings || {});
    for (const [type, value] of entries) {
      await this.prisma.reading.create({
        data: {
          deviceIdRef: device.id,
          type,
          value: Number(value),
          ts: ts ? new Date(ts) : undefined,
        },
      });
    }

    return { ok: true };
  }
}
