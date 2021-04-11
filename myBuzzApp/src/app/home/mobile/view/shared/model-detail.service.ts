import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';

@Injectable({
  providedIn: 'root'
})
export class ModelDetailService { 
  
  constructor(private http : HttpClient) { }
   allMobileBrands : any[];
   addDialogCalled : boolean = false;
   sharedBrandName : string; 
   responseObject : ResponseObject;

   modelForm = new FormGroup({ 
    id: new FormControl(),
    brandId: new FormControl(),
    modelName : new FormControl(),
    modelDiscription : new FormControl(),
    productBrand : new FormControl(),
    deletionStatus : new FormControl()
   });

   initilizeFromGroup(){
    this.modelForm.setValue({
     id : null,
     brandId : null,
     modelName : '',
     modelDiscription : '',
     productBrand : null,
     deletionStatus : 'N'
    }); 
  }

  populateForm(row){
    this.modelForm.setValue(row);
   }
    
   getBrandDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
  }

   getModelDetails(serviceName : string) : Observable<ResponseObject>{ 
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName)); 
   }

   getAllModelsByBrand(brandId : number,serviceName : string) : Observable<ResponseObject>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandId);
  }

  addModelDetails(modelForm : any,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),modelForm,{observe: 'response'});
  }

}
