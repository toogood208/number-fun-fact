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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ApiService = class ApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async analyzeNumber(num) {
        try {
            if (Math.abs(num) > Number.MAX_SAFE_INTEGER) {
                return {
                    number: num,
                    error: true,
                };
            }
            const properties = await this.getNumberProperties(num);
            const funFact = await this.getFunFact(num);
            return {
                number: num,
                is_prime: this.isPrime(num),
                is_perfect: this.isPerfect(num),
                properties: properties,
                digit_sum: this.getDigitSum(num),
                fun_fact: funFact,
            };
        }
        catch {
            throw new common_1.HttpException({
                number: num,
                error: true,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    isPrime(num) {
        try {
            const absNum = Math.abs(num);
            if (absNum <= 1)
                return false;
            for (let i = 2; i <= Math.sqrt(absNum); i++) {
                if (absNum % i === 0)
                    return false;
            }
            return true;
        }
        catch {
            return false;
        }
    }
    isPerfect(num) {
        try {
            const sqrt = Math.sqrt(Math.abs(num));
            return sqrt === Math.floor(sqrt);
        }
        catch {
            return false;
        }
    }
    async getNumberProperties(num) {
        try {
            const properties = [];
            const absNum = Math.abs(num);
            if (num >= 0 && this.isArmstrong(absNum)) {
                properties.push('armstrong');
            }
            if (num !== 0) {
                properties.push(absNum % 2 === 0 ? 'even' : 'odd');
            }
            return properties;
        }
        catch {
            return [];
        }
    }
    isArmstrong(num) {
        try {
            const digits = num.toString().split('');
            const power = digits.length;
            const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
            return sum === num;
        }
        catch {
            return false;
        }
    }
    getDigitSum(num) {
        try {
            return Math.abs(num)
                .toString()
                .split('')
                .reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        catch {
            return 0;
        }
    }
    async getFunFact(num) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://numbersapi.com/${num}/math`, {
                timeout: 5000,
            }));
            return response.data;
        }
        catch {
            return `${num} is a number`;
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
//# sourceMappingURL=api.service.js.map