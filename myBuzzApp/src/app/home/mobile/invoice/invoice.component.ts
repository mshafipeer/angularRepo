// using template driven approach

import { Component, OnInit } from '@angular/core';
import { MobileService } from '../services/mobile.service';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { InvoiceModel } from '../models/invoice/InvoiceModel';
import { Constants } from 'src/app/requestStucture/Constants';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
   invoiceModel:  InvoiceModel;
   matDatepicker :any;  
   sucessMsg : string;
   errorMsg :  string;
   errorCode : string;
   appearance : string ="legacy";
   fontSize : number = Math.max(10, 15);
   responseObject : ResponseObject;
   constructor( private mobileSrv : MobileService){
    this.invoiceModel  = new InvoiceModel();
   }
  
  ngOnInit() {
    //console.log("date submitted from nginint "+ JSON.stringify(this.invoiceDao));
    //this.invoiceDao.invoiceNumber ="2131231231";
  }

  onSubmit(invoiceForm : any)
  {
      this.errorMsg =null;
      this.mobileSrv.addInvoiveDetails(invoiceForm.value,UrlConstant.ADD_INVOICE_DETAILS).subscribe(responseObj => {
        console.log("responseObj :" , JSON.stringify(responseObj));
        this.responseObject = responseObj.body as ResponseObject;
        if("00"== this.responseObject.responseCode){
          this.sucessMsg =  this.responseObject.responseDesc;
          this.mobileSrv.openSnackBar(Constants.RECORD_INSERTED_SUCESSFULLY,"close");
        }else{
          this.mobileSrv.openSnackBar(this.responseObject.responseDesc,"close"); 
        }
    },
    error => {
      console.log("error results :" , error);
      this.errorMsg = error.status;
    }
    );
  }
 
}
