import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InvoiceModel } from '../../models/invoice/InvoiceModel';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
 
@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService{

  responseObject : ResponseObject;
  invoiceForm =  new FormGroup({
    id : new FormControl(),
    invoiceNumber: new FormControl('',Validators.required), 
    supplierName : new FormControl(),
    invoiceDetails : new FormControl(),
    invoiceDate : new FormControl(),
    invoiceAmount : new FormControl(),
    invoiceAttachment : new FormControl(),
    deletionStatus : new FormControl()
   }); 
 
  initilizeFromGroup(){
    this.invoiceForm.setValue({
      id : null,
      invoiceNumber: '',
      supplierName :'',
      invoiceDetails : '',
      invoiceDate : '',
      invoiceAmount :'', 
      invoiceAttachment :'',
      deletionStatus : 'N'
    });
  }
  invoiceModel:  InvoiceModel;
  
  constructor(private http : HttpClient) { }

  populateForm(row){
    this.invoiceForm.setValue(row);
   }
 
  
   getInvoiceDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName)); 
   } 

  addInvoiveDetails(invoiceDao : any,serviceName : string) : Observable<any>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),invoiceDao,{observe: 'response'}); 
  } 

}
