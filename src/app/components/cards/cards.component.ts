import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import menu from '../../data/menu.json';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {


  // @Input() dataMenu: Array<any> = [];



  dataMenu: any;
  showSpinner: boolean = true;
  closeButton: boolean = false;
  items: number = 1;
  addCart: Array<any> = [];

  constructor(
    private dialogRef: MatDialog,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }


  openDialog(item: any) {
    const dialogRef = this.dialogRef.open(ModalComponent);

    this.menuService.getDataToPay(item);

  }

  getData() {
    this.dataMenu = menu
  }

  closeModal() {
    this.closeButton = true
  }

  incrementItems(menu: any) {
    const up = 1;
    this.items += up;
  }

  decrementItems() {
    const decrement = 1;
    if (this.items > 1) {
      this.items -= decrement;
    }
  }


}
