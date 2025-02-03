import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse, NumberResponse, SuccessResponse } from './dto/api.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async analyzeNumber(num: number): Promise<NumberResponse> {
    try {
      // Validate input range
      if (num < 0 || num > Number.MAX_SAFE_INTEGER) {
        return {
          number: num,
          error: true,
        } as ErrorResponse;
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
      } as SuccessResponse;
    } catch {
      throw new HttpException(
        {
          number: num,
          error: true,
        } as ErrorResponse,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private isPrime(num: number): boolean {
    try {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  private isPerfect(num: number): boolean {
    try {
      const sqrt = Math.sqrt(num);
      return sqrt === Math.floor(sqrt);
    } catch {
      return false;
    }
  }

  private async getNumberProperties(num: number): Promise<string[]> {
    try {
      const properties: string[] = [];

      properties.push(num % 2 === 0 ? 'even' : 'odd');

      if (this.isArmstrong(num)) {
        properties.push('armstrong');
      }

      return properties;
    } catch {
      return [];
    }
  }

  private isArmstrong(num: number): boolean {
    try {
      const digits = num.toString().split('');
      const power = digits.length;
      const sum = digits.reduce(
        (acc, digit) => acc + Math.pow(parseInt(digit), power),
        0,
      );
      return sum === num;
    } catch {
      return false;
    }
  }

  private getDigitSum(num: number): number {
    try {
      return num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    } catch {
      return 0;
    }
  }

  private async getFunFact(num: number): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://numbersapi.com/${num}/math`, {
          timeout: 5000,
        }),
      );
      return response.data;
    } catch {
      return `${num} is a number`;
    }
  }
}
