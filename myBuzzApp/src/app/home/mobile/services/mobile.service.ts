import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar} from '@angular/material';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http : HttpClient,private _snackBar: MatSnackBar) { }

 addInvoiveDetails(invoiceDao : any,serviceName : string) : Observable<any>{
   return this.http.post<any>(UrlConstant.URL.concat(serviceName),invoiceDao,{observe: 'response'});
 }

 checkInvoiceByInvoiceNumber(invoiceNumber : string,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),invoiceNumber);
}
 

 addNewBrandDetails(brandForm : any,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),brandForm,{observe: 'response'});
}

addModelDetails(modelForm : any,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),modelForm,{observe: 'response'});
}
 
addSparePartsDetails(sparePartForm : any,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),sparePartForm,{observe: 'response'});
}

addProductStockDetails(sparePartForm : any,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),sparePartForm,{observe: 'response'});
} 

getBrandDetails(serviceName : string) : Observable<ResponseObject>{
  return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
}

  getAllModelsByBrand(brandId : number,serviceName : string) : Observable<ResponseObject>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandId);
  }

  getSparePartsByModelId(modelId : number,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),modelId);
  }

openSnackBar(message: string, action: string) { 
  this._snackBar.open(message,action, {
    duration: 2000,
  });
}

 

getSystemCodesListByTypes(systemCodeTypes : any[],serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),systemCodeTypes);
}

getSystemCodesbyTypes(systemCodeTypes : string,serviceName : string) : Observable<any>{
  return this.http.post<any>(UrlConstant.URL.concat(serviceName),{"systemCodeType":systemCodeTypes});
}


defaultBrand: any[] = [
  {id: 1, brandName: 'Samsung',brandDiscription: "default brand",deletionStatus :'N'},
  {id: 2, brandName: 'Nokia', brandDiscription: "default brand",deletionStatus :'N'},
  {id: 3, brandName: 'Apple', brandDiscription: "default brand",deletionStatus :'N'}
];

defaultModelDetails: any[] = [ 
{id: 1, brandId: '101', modelName: "SamSung S8",modelDiscription:"default desc1",deletionStatus :'N'},
{id: 2, brandId: '102', modelName: "Nokia 7710",modelDiscription:"default desc2",deletionStatus :'N'},
{id: 3, brandId: '103', modelName: "Vivo 6677",modelDiscription:"default desc3",deletionStatus :'N'}
];


defaultMobileBrands = [
{id: '101', brandName: 'SamSung'},
{id: '102', brandName: 'Nokia'},
{id: '103', brandName: 'Vivo'},
{id: '104', brandName: 'general'}
];

defaultMobileModels: any[]
= [
{id: '10', modelName: 'glaxy S8 Plus'},
{id: '11', modelName: 'glaxy J2 pro'},
{id: '12', modelName: 'Glaxy S10'},
{id: '13', modelName: 'others'}
];

defaultSpareParts = [
{id: '200', sparePartName: 'folder'},
{id: '201', sparePartName: 'cover'},
{id: '202', sparePartName: 'battary'}
];

allProductTypes : any[] = [
  {id: '200', name: 'Mobile'},
  {id: '201', name: 'Electronics'},
  {id: '202', name: 'Electric'}
];

}