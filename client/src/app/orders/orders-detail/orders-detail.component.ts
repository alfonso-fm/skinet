import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  order: IOrder;


  constructor(
    private ordersService: OrdersService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService)
    {
      this.bcService.set('@ordersDetails', ' ');
    }

  ngOnInit(): void {
    this.loadOrder();
  }
  // tslint:disable-next-line: typedef
  loadOrder(){
    // tslint:disable-next-line: deprecation
    this.ordersService.getOrder(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(
      order => {
        this.order = order;
        this.bcService.set('@ordersDetails', 'Order# ' + order.id.toString() + ' - ' + order.status);
      },
      error => { console.log(error); }
    );
  }
}
