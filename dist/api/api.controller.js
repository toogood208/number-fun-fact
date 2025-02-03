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
const api_service_1 = require("./api.service");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async classifyNumber(numberStr) {
        try {
            const isValidInteger = /^-?\d+$/.test(numberStr);
            if (!isValidInteger) {
                return {
                    number: numberStr,
                    error: true,
                };
            }
            const number = parseInt(numberStr, 10);
            return this.apiService.analyzeNumber(number);
        }
        catch {
            throw new common_1.HttpException({
                number: numberStr,
                error: true,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)('classify-number'),
    __param(0, (0, common_1.Query)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "classifyNumber", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
//# sourceMappingURL=api.controller.js.map