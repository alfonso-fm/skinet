import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  constructor(
    private basketService: BasketService,
    private accountService: AccountService){}
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }
  // tslint:disable-next-line: typedef
  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if (basketId){
      // tslint:disable-next-line: deprecation
      this.basketService.getBasket(basketId).subscribe(
        () => { console.log('initialised basket'); },
        error => { console.log(error); }
      );
    }
  }
  // tslint:disable-next-line: typedef
  loadCurrentUser(){
    const token = localStorage.getItem('token');
    // tslint:disable-next-line: deprecation
    this.accountService.loadCurrentUser(token).subscribe(
      () => { console.log('loaded user'); },
      error => { console.log(error); }
    );
  }
}
