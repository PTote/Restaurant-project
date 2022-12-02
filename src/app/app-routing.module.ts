import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: 'carrito', component: CarritoComponent },
  { path: 'menu', component: CardsComponent },
  { path: 'payment-form', component: FormComponent },
  { path: '', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
