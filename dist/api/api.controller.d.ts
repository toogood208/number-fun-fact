import { ApiService } from './api.service';
import { NumberResponse } from './dto/api.dto';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    getNumberInfo(numberStr: string): Promise<NumberResponse>;
}
