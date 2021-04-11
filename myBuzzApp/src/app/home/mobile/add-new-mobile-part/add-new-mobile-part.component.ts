import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MobileService } from '../services/mobile.service';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { BrandModel } from '../models/brand/BrandModel';
import { Constants } from 'src/app/requestStucture/Constants';


export interface MobileBrand {
  id: string;
  brandName: string;
}

export interface MobileModel {
  id: string;
  modelName: string;
}

@Component({
  selector: 'app-add-new-mobile-part',
  templateUrl: './add-new-mobile-part.component.html',
  styleUrls: ['./add-new-mobile-part.component.scss']
})

export class AddNewMobilePartComponent implements OnInit {
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);
  responseObject : ResponseObject;
  sparePartForm =  new FormGroup({
    brandId: new FormControl(),
    modelId: new FormControl(),
    sparePartName: new FormControl(),
    spareDiscription : new FormControl()
   });
   errorMsg : string;

  constructor(private mobileSrv : MobileService,private _snackBar: MatSnackBar) {
    this.getMobileBrands();
   }

  allMobileBrands: any[];
  allMobileModels: any[] ;

  ngOnInit() {
  }


  onSubmit(sparePartForm) 
  {
      console.log("before  ", JSON.stringify(sparePartForm.value));
      this.errorMsg = null;
      this.mobileSrv.addSparePartsDetails(sparePartForm.value,UrlConstant.ADD_SPARE_PART_DETAILS).subscribe(responseObj => {
          this.responseObject = responseObj.body as ResponseObject;
          if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
            this.openSnackBar(Constants.RECORD_UPDATED_SUCESSFULLY ,"close");
          }else{
            this.errorMsg = this.responseObject.responseDesc;
            this.openSnackBar(this.errorMsg ,"close");
          }
        },
        error => {
          this.errorMsg = error.status;
          console.log("error results :" , error);
       });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getMobileBrands()
  {
      if(this.allMobileBrands === undefined ){
        this.mobileSrv.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => {
          this.responseObject = responseObj as ResponseObject;
          if(this.responseObject){
            this.allMobileBrands = this.responseObject.brandDetailsList;
          }
        }, error => {
          this.errorMsg = error.status;
          console.log("error results :" , error);
          if("Unknown Error"=== error.statusText){
          }
       });
      }   
   }

   getModelsByBrand(){
    this.mobileSrv.getAllModelsByBrand(this.sparePartForm.get('brandId').value,UrlConstant.GET_MODELS_BY_BRAND_NAME).subscribe(responseObj => {
      this.responseObject = responseObj as ResponseObject;
      if(this.responseObject){
        this.allMobileModels = this.responseObject.productModelDetailsList;
      }
     }, error => {
          this.errorMsg = error.status;
          console.log("error results :" , error);
       });
  } 


}
