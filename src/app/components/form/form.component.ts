import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore'


// declare function testeo(): any;

// declare function sendinfo(
//   name: string | undefined | null,
//   email: string | undefined | null,
//   deliveryaddress: string | undefined | null,
//   phoneNumber: string | undefined | null,
//   paymentMethod: string | undefined | null,
//   order: Array<any>,
//   total: number,
//   comments: string | undefined | null
// ): void;



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
    // private db: AngularFireDatabase
  ) {




  }

  ngOnInit(): void {
    this.getPayment();
    const order = this.menuService.checkData();
    this.order = order;
    console.log(order)
    // this.test();
  }


  getPayment() {
    const data = this.menuService.sendTotalPayment();
    console.log(data)
  }

  onSubmit() {
    this.test();
  }

  // addNewUser(name: string = 'kevyn', email: string = '', address: string, phoneNumber: string) {
  //   this.db.collection().doc(_newId).set({firstName:_fName,lastName:_lName,vipMember:_vip});

  // }

  async test() {
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

    const date = new Date();
    const orderDate = date.toLocaleString();


    const data = {
      orderDate: orderDate,
      clientInfo: this.orderForm.value,
      order: this.order,
      total: total
    }

    const docRef = await addDoc(collection(db, "orders"), data);
    if (docRef) {
      this.orderForm.reset()
    }
    console.log("Document written with ID: ", docRef.id);
    console.log('Payment Detail:', data)
  }


}
