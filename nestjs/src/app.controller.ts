import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//o decorator abaixo define o prefixo de uma rota, no caso /prefixo
@Controller('prefixo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }
}
