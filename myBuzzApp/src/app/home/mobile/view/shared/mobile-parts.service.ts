import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { BrandModel } from '../../models/brand/BrandModel';
import { ProductModel } from '../../models/modelDetails/ProductModel';

@Injectable({
  providedIn: 'root'
})  
export class MobilePartsService { 
  
   allMobileBrands : BrandModel[];
   allMobileModels : ProductModel[];
   addDialogCalled : boolean = false;
   sharedBrandName : string; 
   sharedModelName : string;

   //updatedTableRow : any = {id: 1, brandId: '26', modelId: "76",sparePartName:"folder test",spareDiscription:"folder desc",deletionStatus :'N'}; 
   updatedTableRow : any = null; 
   responseObject : ResponseObject;
 
  constructor(private http : HttpClient) { }

  form =  new FormGroup({
    id : new FormControl(),
    brandId: new FormControl(), 
    modelId : new FormControl(),
    sparePartName : new FormControl(),
    spareDiscription : new FormControl(),
    deletionStatus : new FormControl(),
    productModel : new FormControl()
   }); 
 
   initilizeFromGroup(){
    this.form.setValue({
      id : null,
      brandId : '',
      modelId : '',
      sparePartName : '',
      spareDiscription : '',
      deletionStatus : 'N',
      productModel : null
    });
  }

  populateForm(row ){
    this.form.setValue(row);
   }

   addProductPartsDetails(form : any,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),form,{observe: 'response'});
  }

   getBrandDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
  }

  getModelDetails(serviceName : string) : Observable<any[]>{
    return this.http.get<any[]>(UrlConstant.URL.concat(serviceName));
  }

   getMobiePartsDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName)); 
   }

 
  getAllModelsByBrand(brandId : number,serviceName : string) : Observable<ResponseObject>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandId);
  }
 
  getAllpartsByBrandAndModel(brandId : number,modelId : number,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),{brandId:brandId,modelId:modelId});
  }


  getSparePartsByModelId(modelId : number,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),modelId);
  } 

  getAllSparePartsByBrand(brandId : number,serviceName : string) : Observable<ResponseObject>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandId);
  } 
  
  getUpdatedDialogData () :any {
    return this.updatedTableRow;
  }


}
