import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopParams } from '../../models/shopParams';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() params: ShopParams;
  @Input() pageNumber: number;
  @Output() pageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  onPagerChanged(event: any){
    this.pageChanged.emit(event.page);
  }
}
