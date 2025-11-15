// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SensorsService {
//   private sensors = [
//     { id: 1, name: 'Soil Moisture', value: 42, unit: '%' },
//     { id: 2, name: 'Temperature', value: 21.3, unit: '°C' },
//     { id: 3, name: 'Humidity', value: 58, unit: '%' },
//   ];

//   findAll() {
//     return this.sensors;
//   }
// }

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

  // Generate fake 2-month history for a given sensor
  getHistory(sensorId: number, range: string) {
    const now = new Date();
    const history = [];
  
    // Map range → total hours
    const hoursByRange: Record<string, number> = {
      hour: 1,
      day: 24,
      week: 24 * 7,
      month: 24 * 30,
      default: 24 * 60, // 2 months
    };
  
    const totalHours = hoursByRange[range] ?? hoursByRange.default;
    const baseValue = this.sensors.find(s => s.id === sensorId)?.value ?? 50;
  
    const NUM_POINTS = 100; // max data points per chart
    const step = totalHours / NUM_POINTS;
  
    for (let i = NUM_POINTS - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * step * 60 * 60 * 1000);
      const variation = Math.sin(i / 5) * 3 + (Math.random() - 0.5) * 2;
      const value = Math.max(0, baseValue + variation);
      history.push({ timestamp, value });
    }
  
    return history;
  }
  
  
}
