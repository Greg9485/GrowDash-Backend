"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sensors_controller_1 = require("./sensors.controller");
describe('SensorsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sensors_controller_1.SensorsController],
        }).compile();
        controller = module.get(sensors_controller_1.SensorsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sensors.controller.spec.js.map