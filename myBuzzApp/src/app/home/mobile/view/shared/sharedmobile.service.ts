import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { BrandModel } from '../../models/brand/BrandModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';


@Injectable({
  providedIn: 'root'
})
 
  
export class SharedmobileService {

  constructor(private http : HttpClient) { } 
  updatedTableRow : BrandModel = new BrandModel();
  responseObject : ResponseObject;

  newbrandForm =  new FormGroup({
    id : new FormControl(),
    brandName: new FormControl('',Validators.required),
    brandDiscription : new FormControl(),
    deletionStatus : new FormControl()
   }); 

  initilizeFromGroup(){
     this.newbrandForm.setValue({
      id : null,
      brandName  : '',
      brandDiscription : '',
      deletionStatus : 'N'
     });
   }

   populateForm(brandrow){
    this.newbrandForm.setValue(brandrow);
   }
   
  addNewBrandDetails(brandForm : any,serviceName : string) : Observable<any>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandForm,{observe: 'response'});
  }

  getBrandDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
  }

   getUpdatedDialogData() : Observable <BrandModel> {
     alert(this.updatedTableRow.brandName);
     return <any>this.updatedTableRow;      
   }
 
   setUpdatedRow(form : any) : Observable <any>{
     this.updatedTableRow = form
     return <any>this.updatedTableRow;  
   }
} 
