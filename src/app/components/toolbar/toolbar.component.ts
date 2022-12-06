import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  ocultar: boolean = false;
  mostrar: boolean = true;
  @ViewChild('test') menu: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ocultarMenu() {
    const menu = document.getElementById('check')
    // menu?.click();

    setTimeout(() => {
      menu?.click();
    }, 250);
  }



}
