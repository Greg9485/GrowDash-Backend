import { Injectable } from '@nestjs/common';

@Injectable()
export class SensorsService {
  private sensors = [
    { id: 1, name: 'Soil Moisture', value: 42, unit: '%' },
    { id: 2, name: 'Temperature', value: 21.3, unit: '°C' },
    { id: 3, name: 'Humidity', value: 58, unit: '%' },
  ];

  findAll() {
    return this.sensors;
  }
}
