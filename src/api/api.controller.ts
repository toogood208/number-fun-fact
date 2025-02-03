import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { NumberResponse } from './dto/api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('classify-number')
  async getNumberInfo(
    @Query('number') numberStr: string,
  ): Promise<NumberResponse> {
    try {
      // Check if the input is a valid number
      const number = parseInt(numberStr);

      if (isNaN(number)) {
        return {
          number: numberStr,
          error: true,
        };
      }

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
