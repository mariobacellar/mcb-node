import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
 1 }

 @Get('/hello')
 getHelloMario(): string {
   return this.appService.getHelloMario();
 } 

}
