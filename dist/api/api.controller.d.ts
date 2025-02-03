import { ApiService } from './api.service';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    classifyNumber(numberStr: string): Promise<import("./dto/api.dto").SuccessResponse | import("./dto/api.dto").ErrorResponse | {
        number: string;
        error: boolean;
    }>;
}
