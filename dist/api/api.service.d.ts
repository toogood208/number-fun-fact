import { NumberResponse } from './dto/api.dto';
import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    analyzeNumber(num: number): Promise<NumberResponse>;
    private isPrime;
    private isPerfect;
    private getNumberProperties;
    private isArmstrong;
    private getDigitSum;
    private getFunFact;
}
