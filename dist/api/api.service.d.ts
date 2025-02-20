import { HttpService } from '@nestjs/axios';
import { NumberResponse } from './dto/api.dto';
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
