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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ApiController = class ApiController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async latest(deviceId) {
        const device = await this.prisma.device.findUnique({ where: { deviceId } });
        if (!device)
            return { error: 'device not found' };
        const raw = await this.prisma.$queryRaw `SELECT r.type, r.value, r.ts FROM Reading r WHERE r.deviceIdRef = ${device.id} AND r.ts = (SELECT MAX(ts) FROM Reading r2 WHERE r2.type = r.type AND r2.deviceIdRef = ${device.id})`;
        return { deviceId, latest: raw };
    }
    async telemetry(deviceId, from, to, type) {
        const device = await this.prisma.device.findUnique({ where: { deviceId } });
        if (!device)
            return { error: 'device not found' };
        const where = { deviceIdRef: device.id };
        if (type)
            where.type = type;
        if (from || to) {
            where.ts = {};
            if (from)
                where.ts.gte = new Date(from);
            if (to)
                where.ts.lte = new Date(to);
        }
        const readings = await this.prisma.reading.findMany({
            where,
            orderBy: { ts: 'asc' },
            take: 10000,
        });
        return { deviceId, readings };
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)('devices/:deviceId/latest'),
    __param(0, (0, common_1.Param)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "latest", null);
__decorate([
    (0, common_1.Get)('devices/:deviceId/telemetry'),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "telemetry", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __param(0, (0, common_1.Inject)('PRISMA')),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], ApiController);
//# sourceMappingURL=api.controller.js.map