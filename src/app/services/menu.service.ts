import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import menu from '../data/menu.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  prepareDataToPay: Array<any> = [];
  originalProduct: Array<any> = [];
  totalPayment: Array<any> = [];

  constructor(
    private http: HttpClient
  ) { }


  getDataMenu(): Observable<any> {
    return of(menu);
  }


  getDataToPay(data: any) {
    let carrito: any[] = []
    const itemCarrito = {
      name: data.name,
      price: data.price,
      items: data.items,
      id: data.id
    };

    this.prepareDataToPay.push(itemCarrito)
    this.originalProduct.push(itemCarrito);
  }

  checkData(): Array<any> {
    return this.prepareDataToPay;
  }

  getOriginalProduct(): Array<any> {
    return this.originalProduct;
  }

  getTotalPayment(data: any) {
    this.totalPayment.push(data)
    // return this.totalPayment = data
    console.log('Service:', this.totalPayment)
  }

  sendTotalPayment() {
    return this.totalPayment;
  }
}
