// import { Controller, Get } from '@nestjs/common';
// import { SensorsService } from './sensors.service';

// @Controller('sensors')
// export class SensorsController {
//   constructor(private readonly sensorsService: SensorsService) {}

//   @Get()
//   findAll() {
//     return this.sensorsService.findAll();
//   }
// }


import { Controller, Get, Param, Query } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id/history')
  getSensorHistory(@Param('id') id: string, @Query('range') range: string) {
    return this.sensorsService.getHistory(Number(id), range);
  }
}
