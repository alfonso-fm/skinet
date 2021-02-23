import { HttpParams } from '@angular/common/http';

export class ShopParams{
    brandId = 0;
    typeId = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 6;
    totalCount = 0;
    search: string;

    // tslint:disable-next-line: typedef
    getParams(){
        let params = new HttpParams();
        if (this.brandId !== 0){ params = params.append('brandId', this.brandId.toString()); }
        if (this.typeId !== 0){ params = params.append('typeId', this.typeId.toString()); }
        if (this.search){ params = params.append('search', this.search); }
        params = params.append('sort', this.sort);
        params = params.append('pageIndex', this.pageNumber.toString());
        params = params.append('pageIndex', this.pageSize.toString());
        return params;
    }
    // tslint:disable-next-line: typedef
    getPageNumber(){
        return (this.pageNumber - 1)  * this.pageSize + 1;
    }
    // tslint:disable-next-line: typedef
    getPageNumber2(){
        return this.pageNumber * this.pageSize > this.totalCount ?
            this.totalCount :
            this.pageNumber * this.pageSize;
    }
    // tslint:disable-next-line: typedef
    showTotals(){
       return this.totalCount && this.totalCount > 0;
    }
    // tslint:disable-next-line: typedef
    showEmptyMessage(){
        return this.totalCount === 0 && true;
    }
}
