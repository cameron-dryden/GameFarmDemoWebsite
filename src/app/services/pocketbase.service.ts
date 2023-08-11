import PocketBase from 'pocketbase';
import { Injectable } from '@angular/core';

@Injectable()
export class PocketbaseService {
  pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://192.168.186.2:8090');
  }
}
