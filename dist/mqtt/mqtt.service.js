"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const mqtt_1 = require("mqtt");
const client_1 = require("@prisma/client");
let MqttService = class MqttService {
    constructor(prisma) {
        this.prisma = prisma;
        const broker = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
        this.client = (0, mqtt_1.connect)(broker);
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('grow/+/+/+/+');
        });
        this.client.on('message', async (topic, message) => {
            var _a;
            try {
                const parts = topic.split('/');
                const sensor = parts.pop();
                const deviceId = parts.pop();
                if (!deviceId || !sensor)
                    return;
                let payload;
                try {
                    payload = JSON.parse(message.toString());
                }
                catch (e) {
                    payload = message.toString();
                }
                const value = payload && ((_a = payload.value) !== null && _a !== void 0 ? _a : payload);
                let device = await this.prisma.device.findUnique({ where: { deviceId } });
                if (!device)
                    device = await this.prisma.device.create({ data: { deviceId } });
                await this.prisma.reading.create({
                    data: {
                        deviceIdRef: device.id,
                        type: sensor,
                        value: Number(value),
                    },
                });
            }
            catch (e) {
                console.error('MQTT message handler error', e);
            }
        });
    }
};
exports.MqttService = MqttService;
exports.MqttService = MqttService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRISMA')),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], MqttService);
//# sourceMappingURL=mqtt.service.js.map