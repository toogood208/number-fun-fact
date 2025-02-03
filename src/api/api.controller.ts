import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') numberStr: string) {
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
    } catch {
      throw new HttpException(
        {
          number: numberStr,
          error: true,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
