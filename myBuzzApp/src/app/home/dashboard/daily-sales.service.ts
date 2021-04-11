import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { StockViewModel } from '../mobile/models/stockView/StockViewModel';
import { UserModel } from 'src/app/requestStucture/genericModels/UserModel';
import { DailySalesModel } from './DailySalesModel';

@Injectable({
  providedIn: 'root'
}) 
export class DailySalesService {
  
  constructor(private http : HttpClient) { }

  stockViewModel : StockViewModel;
  responseObject : ResponseObject;
  systemUser : UserModel; 
 
  form =  new FormGroup({
    id : new FormControl(),
    productId : new FormControl(),
    serialNumber : new FormControl(),
    productDesc : new FormControl(),
    productRefrence : new FormControl(), 
    customerId : new FormControl(),
    unitPrice : new FormControl(), 
    quantity : new FormControl(),
    discount : new FormControl(),
    total : new FormControl(),
    createdUserId : new FormControl(),
    createdDate : new FormControl(),
    notes : new FormControl(),
    deletionStatus : new FormControl()
   }); 
 
  initilizeFromGroup(){
    this.form.setValue({
      id : null,
      serialNumber : '',
      productDesc : '',
      productRefrence: '',
      customerId :'',
      unitPrice : '',
      quantity : '',
      discount :'', 
      total :'',
      createdUserId : '',
      createdDate : '',
      notes : '',
      deletionStatus : 'N'
    });
  }

  populateForm(row){
    this.form.setValue(row);
  }

  getProductDetailsByRefrence(productRefrence : string, quantity : number,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),{productRefrence:productRefrence,quantity:quantity});
  }

  saveSalesTranactionDetails(dailySalesList : DailySalesModel[] ,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),dailySalesList,{observe: 'response'});
  }



  isValidObject(object :any) : boolean {
    if(object != null && object != 'undefined'){
      return true;
    }else{ 
      return false; 
    }
  }
 
  isValidCollection(object :any) : boolean {
    if(object != null && object != 'undefined' && object.length > 0){
      return true;
    }else{  
      return false; 
    }
  } 

  public async getUserDetails()
  {
    let user  = await sessionStorage.getItem("userData");
    //return JSON.parse(user);
    this.systemUser = JSON.parse(user);
  }

} 
