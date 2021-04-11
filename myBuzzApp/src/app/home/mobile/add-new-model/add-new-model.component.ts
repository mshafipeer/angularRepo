
//using model driven approach with FormBuilder

import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MobileService } from '../services/mobile.service';
import { BrandModel } from '../models/brand/BrandModel';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { Constants } from 'src/app/requestStucture/Constants';

export interface MobileBrand {
  id: string;
  brandName: string;
}


@Component({
  selector: 'app-add-new-model',
  templateUrl: './add-new-model.component.html',
  styleUrls: ['./add-new-model.component.scss']
})

export class AddNewModelComponent implements OnInit {

   color : 'primary';
   responseMsg : string;
   errorMsg :string;
   errorCode : string;
   brandModel : BrandModel [];
   isWait :boolean = false;
   appearance : string ="legacy";
   fontSize : number = Math.max(10, 15);
   responseObject : ResponseObject;

   newModelForm =  new FormGroup({
    brandId: new FormControl(),
    brandName: new FormControl(),
    modelName : new FormControl(),
    modelDiscription : new FormControl()
   });

  allMobileBrands: any[];
  id: number;
  brandName : string;
  brandDescription : string;
  deletionStatus  : string;

  constructor(private mobileSrv : MobileService,private _snackBar: MatSnackBar) {
      this.getMobileBrands(); 
   }
  ngOnInit() {
  }

  
  onSubmit(newModelForm)
  {
    this.isWait = true;
      console.log("before  ", JSON.stringify(newModelForm.value));
      this.responseMsg = null; 
      this.errorMsg = null;
      this.mobileSrv.addModelDetails(newModelForm.value,UrlConstant.ADD_MODEL_DETAILS).subscribe(responseObj => {
          this.responseObject =  responseObj.body as ResponseObject;
          this.errorCode = responseObj.responseCode;
          this.isWait = false;
          if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
            this.openSnackBar(Constants.RECORD_UPDATED_SUCESSFULLY ,"close");
          }else{ 
            this.responseMsg = this.responseObject.responseDesc;
            this.openSnackBar(this.responseMsg ,"close");
           // newModelForm.resetForm();
          }
        },
        error => {
          this.errorMsg = error.status;
          console.log("error results  sadasd:" , error);
       });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getMobileBrands(){
    if(this.allMobileBrands === undefined ){
      this.mobileSrv.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => 
      {
        this.responseObject = responseObj as ResponseObject;
        if(this.responseObject){
          this.allMobileBrands = this.responseObject.brandDetailsList;
        }
        
      },error => {
        this.errorMsg = error.status;
        //Unknown Error
        console.log("error.statusText:" , error.statusText);
        console.log("error results  sadasd:" , error);
        if("Unknown Error"===error.statusText){
        
        }
     }); 
    }
  }  


}
