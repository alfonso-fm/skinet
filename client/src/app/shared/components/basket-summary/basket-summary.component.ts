import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() isOrder = false;

  constructor(
    private basketService: BasketService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // tslint:disable-next-line: typedef
  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }
  // tslint:disable-next-line: typedef
  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item);
  }

  // tslint:disable-next-line: typedef
  removeBasketItem(item: IBasketItem){
    this.remove.emit(item);
  }
}
