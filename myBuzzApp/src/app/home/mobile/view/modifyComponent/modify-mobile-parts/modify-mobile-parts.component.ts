import { Component, OnInit } from '@angular/core';
import { MobilePartsService } from '../../shared/mobile-parts.service';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { Constants } from 'src/app/requestStucture/Constants';

@Component({
  selector: 'app-modify-mobile-parts',
  templateUrl: './modify-mobile-parts.component.html',
  styleUrls: ['./modify-mobile-parts.component.scss']
})
export class ModifyMobilePartsComponent implements OnInit {

  sucessMsg : string; 
  errorMsg :  string; 
  errorCode : string;
  responseCode : string;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);
  
  constructor(public  mobilePartsService : MobilePartsService ,
    private notificationSrv : NotificationService,
    public  dialogRef : MatDialogRef<ModifyMobilePartsComponent>) { }

  ngOnInit() {
  }
 
  submitdata(form){     

    //alert("i am in modify parts form at onSumbit "+JSON.stringify(form.value));  
    this.sucessMsg = null; 
    this.errorMsg = null;  
    this.mobilePartsService.addProductPartsDetails(form.value,UrlConstant.ADD_SPARE_PART_DETAILS).subscribe(responseObj =>
    {
        console.log("responseObjddd :" , JSON.stringify(responseObj));
        this.mobilePartsService.responseObject = responseObj.body as ResponseObject;
        this.responseCode = this.mobilePartsService.responseObject.responseCode;
        if("00" === this.responseCode){
          this.mobilePartsService.updatedTableRow = null;
          this.mobilePartsService.updatedTableRow = form.value;
          this.sucessMsg = this.mobilePartsService.responseObject.responseDesc;
          this.notificationSrv.sucess(Constants.RECORD_UPDATED_SUCESSFULLY);
          this.closeDialog();
        }else{
          this.errorMsg = this.mobilePartsService.responseObject.responseDesc;
          this.notificationSrv.sucess(this.errorMsg);
        }
      },
      error => {
        this.errorMsg = error.statusText;
        console.log("error results :" , error);
     });
  }

  closeDialog()  
  { 
    this.mobilePartsService.form.reset();
    this.mobilePartsService.initilizeFromGroup();
    this.dialogRef.close();
  }
  
  onClear(){
    this.notificationSrv.sucess(":: Submitted sucessfully");
    this.mobilePartsService.form.reset();
    this.mobilePartsService.initilizeFromGroup();
  }

  getAllModelsByBrandOnChange(){ 
     let brandId = this.mobilePartsService.form.get('brandId').value;
     if(brandId){
          this.mobilePartsService.getAllModelsByBrand(brandId, UrlConstant.GET_MODELS_BY_BRAND_NAME).subscribe(responseObj => 
          {
            this.mobilePartsService.responseObject = responseObj as ResponseObject;
            if(this.mobilePartsService.responseObject){
              this.mobilePartsService.allMobileModels = this.mobilePartsService.responseObject.productModelDetailsList;
            } 
          }, error => {
        console.log("error results :" , error); 
        });
     }
  }

}
