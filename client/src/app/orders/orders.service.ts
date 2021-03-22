import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IOrder, IOrderItem } from '../shared/models/order';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiURl;
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getOrders(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }
  // tslint:disable-next-line: typedef
  getOrder(id: number){
    // tslint:disable-next-line: deprecation
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }
}
