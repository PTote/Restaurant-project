import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';



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
  }


  getPayment() {
    const data = this.menuService.sendTotalPayment();
  }

  onSubmit() {
    console.log(this.orderForm.value)
    const order = this.menuService.checkData();
    let total: number = 0;
    this.menuService.sendTotalPayment().forEach(data => {
      total = data
    });
    const { name, email, address, phoneNumber, paymentMethod, comment } = this.orderForm.value;
    // sendinfo(name, email, address, phoneNumber, paymentMethod, order, total, comment);
  }

  // addNewUser(name: string = 'kevyn', email: string = '', address: string, phoneNumber: string) {
  //   this.db.collection().doc(_newId).set({firstName:_fName,lastName:_lName,vipMember:_vip});

  // }




}
