import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestsService {
  loading: boolean = false;

  constructor() { }
}
