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
    getHistory(sensorId, range) {
        var _a, _b, _c;
        const now = new Date();
        const history = [];
        const hoursByRange = {
            hour: 1,
            day: 24,
            week: 24 * 7,
            month: 24 * 30,
            default: 24 * 60,
        };
        const totalHours = (_a = hoursByRange[range]) !== null && _a !== void 0 ? _a : hoursByRange.default;
        const baseValue = (_c = (_b = this.sensors.find(s => s.id === sensorId)) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 50;
        const NUM_POINTS = 100;
        const step = totalHours / NUM_POINTS;
        for (let i = NUM_POINTS - 1; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * step * 60 * 60 * 1000);
            const variation = Math.sin(i / 5) * 3 + (Math.random() - 0.5) * 2;
            const value = Math.max(0, baseValue + variation);
            history.push({ timestamp, value });
        }
        return history;
    }
};
exports.SensorsService = SensorsService;
exports.SensorsService = SensorsService = __decorate([
    (0, common_1.Injectable)()
], SensorsService);
//# sourceMappingURL=sensors.service.js.map