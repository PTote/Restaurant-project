import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore'
import { MatDialog } from '@angular/material/dialog';
import { ModalConfimComponent } from '../modal-confim/modal-confim.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  order: Array<any> = []

  orderForm = this.fb.group({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    paymentMethod: new FormControl(''),
    comment: new FormControl(''),
  });

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPayment();
    const order = this.menuService.getAddToCart();
    this.order = order;
  }


  getPayment() {
    const data = this.menuService.sendTotalPayment();
  }

  onSubmit() {
    this.sendOrder();
  }

  async sendOrder() {
    let total: number = 0;
    this.menuService.sendTotalPayment().forEach(data => {
      total = data
    });
    const firebaseConfig = {
      apiKey: "AIzaSyDw5eDEmZNHWFXY-E0rsn4ROwgpJy8PZ54",
      authDomain: "myrest-1228a.firebaseapp.com",
      projectId: "myrest-1228a",
      storageBucket: "myrest-1228a.appspot.com",
      messagingSenderId: "40994468531",
      appId: "1:40994468531:web:1a2aa72369df836dbab6c6",
      measurementId: "G-SVV7PT9G7E"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const getdate = new Date();
    const orderDate = getdate.toLocaleString();
    const date = getdate.toLocaleDateString(); // 5/12/2020
    const time = getdate.toLocaleTimeString(); // 6:50:21 PM

    const data = {
      orderDate: orderDate,
      clientInfo: this.orderForm.value,
      order: this.order,
      total: total
    }

    const docRef = await addDoc(collection(db, "orders"), data);
    if (docRef) {
      this.orderForm.reset();
      this.openModalConfirm();
      this.menuService.setOrderId(docRef.id, date, time);
    }
    // console.log("Document written with ID: ", docRef.id);
    // console.log('Payment Detail:', data)
  }


  openModalConfirm() {
    const dialogRef = this.dialogRef.open(ModalConfimComponent);
  }

}
