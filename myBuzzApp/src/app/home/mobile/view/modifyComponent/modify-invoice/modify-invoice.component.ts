import { Component, OnInit } from '@angular/core';
import { InvoiceDetailsService } from '../../shared/invoice-details.service';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Constants } from 'src/app/requestStucture/Constants';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Component({
  selector: 'app-modify-invoice',
  templateUrl: './modify-invoice.component.html',
  styleUrls: ['./modify-invoice.component.scss']
})
export class ModifyInvoiceComponent implements OnInit {
  myDatePicker : any;
  sucessMsg : string;
  errorMsg :  string;
  errorCode : string;
  responseCode : string;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);


  
  constructor(public  invoiceDetailsService : InvoiceDetailsService ,
              private notificationSrv : NotificationService,
              public  dialogRef : MatDialogRef<ModifyInvoiceComponent>) {
               }

  ngOnInit() {
  }

  onSubmit(invoiceForm){ 
    this.sucessMsg = null; 
    this.errorMsg = null; 
    
    this.invoiceDetailsService.addInvoiveDetails(invoiceForm.value,UrlConstant.ADD_INVOICE_DETAILS).subscribe(responseObj => {
        console.log("responseObj after addInvoiveDetails :" , JSON.stringify(responseObj));
        this.invoiceDetailsService.responseObject = responseObj.body;
        console.log("this.invoiceDetailsService.responseObject :" , JSON.stringify(this.invoiceDetailsService.responseObject));
        this.responseCode = this.invoiceDetailsService.responseObject.responseCode;
        if("00"== this.responseCode){
          console.log("Newly Created Invoice from :" , JSON.stringify(this.invoiceDetailsService.responseObject.invoiceDetails));
          this.sucessMsg = this.invoiceDetailsService.responseObject.responseDesc; // responseObj.body.responseMessage;
          this.notificationSrv.sucess(Constants.RECORD_UPDATED_SUCESSFULLY); 
          this.closeDialog();
        }else{
          this.errorMsg = this.invoiceDetailsService.responseObject.responseDesc;
          this.notificationSrv.sucess(this.errorMsg);
        } 
        console.log("responseObj.status :" + responseObj.status);
      }, 
      error => {
        this.errorMsg = error.status;
        //this.errorMsg = this.invoiceDetailsService.responseObject.responseDesc;
        console.log("this.errorMsg from error:" , this.errorMsg);
        console.log("error results :" , error);
     });
  }

  closeDialog()  
  { 
    this.invoiceDetailsService.invoiceForm.reset();
    this.invoiceDetailsService.initilizeFromGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.notificationSrv.sucess(":: Submitted sucessfully");
    this.invoiceDetailsService.invoiceForm.reset();
    this.invoiceDetailsService.initilizeFromGroup();
  }
}
