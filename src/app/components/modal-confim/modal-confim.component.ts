import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-modal-confim',
  templateUrl: './modal-confim.component.html',
  styleUrls: ['./modal-confim.component.css']
})
export class ModalConfimComponent implements OnInit {

  orderId: string = '';
  date: string = '';
  time: string = '';

  constructor(
    private menuService: MenuService

  ) { }

  ngOnInit(): void {
    this.getOrderId();
  }

  getOrderId() {
    const getOrderId = this.menuService.getOrderId();
    this.date = getOrderId.date;
    this.time = getOrderId.time
    this.orderId = getOrderId.id;
  }

  clearData() {
    this.menuService.clearArrayData();
  }

}
