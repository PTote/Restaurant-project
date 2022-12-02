import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import menu from '../../data/menu.json';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  dataMenuAdd: Array<any> = [];
  items: number = 1;
  copyMenu: any;
  totalPayment: any;
  productsPrice: Array<any> = [];

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const checkData = this.menuService.checkData();
    this.dataMenuAdd = checkData;
  }


  incrementItems(data: any) {
    const filter = menu.filter(product => product.id === data.id)

    this.dataMenuAdd.forEach(product => {
      if (product.id === data.id) {
        product.items += 1;
        product.price += filter[0].price
      }
    })


    console.log(filter);
  }

  decrementItems(data: any) {
    const filter = menu.filter(product => product.id === data.id)

    this.dataMenuAdd.forEach(product => {
      if (product.id === data.id) {
        if (product.items > 1) {
          product.items -= 1;
          product.price -= filter[0].price
        }
      }
    })
  }


  deleteItems(data: any) {
    const test = this.dataMenuAdd.findIndex(product => product.id === data.id);
    const deleteProduct = this.dataMenuAdd.splice(test, 1)
    console.log(deleteProduct)
  }

  priceTotal() {
    // const myArray = [10, 10, 30];
    // let arrayData = array
    let total: number = 0;
    // let i: any ;

    for (let i in this.dataMenuAdd) {

      total += this.dataMenuAdd[i].price;

    }

    this.menuService.getTotalPayment(total);
    console.log('Total:', total);

  }

}
