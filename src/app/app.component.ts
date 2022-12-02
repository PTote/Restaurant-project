import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MenuService } from './services/menu.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  test: any;
  showSpinner: boolean = true;
  closeButton: boolean = false;

  constructor(
    private menuService: MenuService,
  ) { }



  ngOnInit(): void {
    this.getData()
  }




  getData() {
    this.menuService.getDataMenu()
      .pipe(finalize(() => this.showSpinner = false))
      .subscribe(data => {
        this.test = data
      })
  }

  closeModal() {
    this.closeButton = true
  }


  // Output:

  // this is the third message
  // this is the second message
  // this is the first message



}
