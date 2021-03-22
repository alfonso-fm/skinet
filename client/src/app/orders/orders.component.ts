import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  // tslint:disable-next-line: typedef
  getOrders(){
    // tslint:disable-next-line: deprecation
    this.ordersService.getOrders().subscribe(
      response => {
        this.orders = response;
      },
      error => { console.log(error); }
    );
  }
}
