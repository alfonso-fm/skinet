import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'Price: Hight to Low', value: 'proceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts(useCache = false){
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(useCache).subscribe(
      response => {
        this.products = response.data;
        this.shopParams.totalCount = response.count;
      },
      error => { console.log(error); }
    );
  }
  // tslint:disable-next-line: typedef
  getBrands(){
    // tslint:disable-next-line: deprecation
    this.shopService.getBrands().subscribe(
      response => { this.brands = [{id: 0, name: 'All'}, ...response]; },
      error => { console.log(error); }
    );
  }
  // tslint:disable-next-line: typedef
  getTypes(){
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(
      response => { this.types = [{id: 0, name: 'All'}, ...response]; },
      error => { console.log(error); }
    );
  }
  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }
  // tslint:disable-next-line: typedef
  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
