import { Controller, Get, Param, Query, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('api')
export class ApiController {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  // Get latest readings for a device
  @Get('devices/:deviceId/latest')
  async latest(@Param('deviceId') deviceId: string) {
    const device = await this.prisma.device.findUnique({ where: { deviceId } });
    if (!device) return { error: 'device not found' };

    // get last reading per type
    const raw = await this.prisma.$queryRaw<
      Array<{ type: string; value: number; ts: string }>
    >`SELECT r.type, r.value, r.ts FROM Reading r WHERE r.deviceIdRef = ${device.id} AND r.ts = (SELECT MAX(ts) FROM Reading r2 WHERE r2.type = r.type AND r2.deviceIdRef = ${device.id})`;

    return { deviceId, latest: raw };
  }

  // time-range query for a device (type optional)
  @Get('devices/:deviceId/telemetry')
  async telemetry(
    @Param('deviceId') deviceId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('type') type?: string,
  ) {
    const device = await this.prisma.device.findUnique({ where: { deviceId } });
    if (!device) return { error: 'device not found' };

    const where: any = { deviceIdRef: device.id };
    if (type) where.type = type;
    if (from || to) {
      where.ts = {};
      if (from) where.ts.gte = new Date(from);
      if (to) where.ts.lte = new Date(to);
    }

    const readings = await this.prisma.reading.findMany({
      where,
      orderBy: { ts: 'asc' },
      take: 10000,
    });

    return { deviceId, readings };
  }
}
