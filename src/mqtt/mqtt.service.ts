import { Injectable, Inject } from '@nestjs/common';
import { connect } from 'mqtt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MqttService {
  private client: any;
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {
    const broker = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
    this.client = connect(broker);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      // subscribe to basic grow topic structure
      this.client.subscribe('grow/+/+/+/+');
    });

    this.client.on('message', async (topic: string, message: Buffer) => {
      try {
        // topic pattern: grow/{facility}/{room}/{device}/{sensor}
        const parts = topic.split('/');
        const sensor = parts.pop();
        const deviceId = parts.pop();
        if (!deviceId || !sensor) return;

        let payload: any;
        try { payload = JSON.parse(message.toString()); } catch (e) { payload = message.toString(); }

        const value = payload && (payload.value ?? payload);

        let device = await this.prisma.device.findUnique({ where: { deviceId } });
        if (!device) device = await this.prisma.device.create({ data: { deviceId } });

        await this.prisma.reading.create({
          data: {
            deviceIdRef: device.id,
            type: sensor,
            value: Number(value),
          },
        });
      } catch (e) {
        console.error('MQTT message handler error', e);
      }
    });
  }
}
