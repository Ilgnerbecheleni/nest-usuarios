/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';

@Injectable()
export class AppService {
  getHello() {
    return {api:"API V1"}
  }
}
