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
      // Validate the input string using a regular expression
      const isValidInteger = /^-?\d+$/.test(numberStr);

      // If the input is not a valid integer (including negative integers), return an error
      if (!isValidInteger) {
        return {
          number: numberStr,
          error: true,
        };
      }

      // Parse the validated string into a number
      const number = parseInt(numberStr, 10);

      // Pass the validated number to the service
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
