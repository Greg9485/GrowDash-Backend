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
exports.IngestService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let IngestService = class IngestService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleHttp(payload) {
        const { deviceId, ts, readings } = payload;
        if (!deviceId)
            return { ok: false, error: 'deviceId required' };
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
};
exports.IngestService = IngestService;
exports.IngestService = IngestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRISMA')),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], IngestService);
//# sourceMappingURL=ingest.service.js.map