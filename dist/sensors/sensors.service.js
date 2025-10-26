"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
let SensorsService = class SensorsService {
    constructor() {
        this.sensors = [
            { id: 1, name: 'Soil Moisture', value: 42, unit: '%' },
            { id: 2, name: 'Temperature', value: 21.3, unit: '°C' },
            { id: 3, name: 'Humidity', value: 58, unit: '%' },
        ];
    }
    findAll() {
        return this.sensors;
    }
};
exports.SensorsService = SensorsService;
exports.SensorsService = SensorsService = __decorate([
    (0, common_1.Injectable)()
], SensorsService);
//# sourceMappingURL=sensors.service.js.map