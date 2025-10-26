"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sensors_service_1 = require("./sensors.service");
describe('SensorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sensors_service_1.SensorsService],
        }).compile();
        service = module.get(sensors_service_1.SensorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sensors.service.spec.js.map