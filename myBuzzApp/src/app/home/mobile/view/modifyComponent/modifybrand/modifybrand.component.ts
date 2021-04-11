import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SharedmobileService } from '../../shared/sharedmobile.service';
import { NotificationService } from '../../../services/notification.service';
import { Constants } from 'src/app/requestStucture/Constants';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Component({
  selector: 'app-modifybrand',
  templateUrl: './modifybrand.component.html',
  styleUrls: ['./modifybrand.component.scss']
})
export class ModifybrandComponent implements OnInit {
  responseMsg : string;
  errorCode :string; 
  errorMsg : string;
  resonseCode : string;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15); 
  constructor(public  sharedMobileService : SharedmobileService ,
              private notificationSrv : NotificationService,
              public  dialogRef : MatDialogRef<ModifybrandComponent>) { }

  ngOnInit() {
  }

  submitData(newbrandForm){  
    this.responseMsg = null; 
    this.errorMsg = null;  
    this.sharedMobileService.addNewBrandDetails(newbrandForm.value,UrlConstant.ADD_BRAND_DETAILS).subscribe(responseObj => {
        this.sharedMobileService.responseObject = responseObj.body;
        this.resonseCode = this.sharedMobileService.responseObject.responseCode;
        this.errorCode = responseObj.responseCode;
        if("00" === this.resonseCode){  
          this.responseMsg = this.sharedMobileService.responseObject.responseDesc;
          this.sharedMobileService.updatedTableRow = this.sharedMobileService.responseObject.brandDetails; 
          //this block is getting executed later while after close dialog is getting added first
          console.log("this.sharedMobileService.updatedTableRow :" , this.sharedMobileService.updatedTableRow);
          this.notificationSrv.sucess(Constants.RECORD_UPDATED_SUCESSFULLY);  
          this.closeDialog();
        }else{ 
          console.log("responseObj.status :" + responseObj.status);
          this.errorMsg = this.sharedMobileService.responseObject.responseDesc;
          this.notificationSrv.sucess(this.errorMsg); 
        }
      }, 
      error => {
        // this.sharedMobileService.updatedTableRow = newbrandForm.value; 
        // alert(this.sharedMobileService.updatedTableRow); 
        this.errorMsg = error.status;
        console.log("error results :" , error);
     });
  }
  
  closeDialog()
  {
    this.sharedMobileService.newbrandForm.reset();
    this.sharedMobileService.initilizeFromGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.notificationSrv.sucess(":: Submitted sucessfully");
    this.sharedMobileService.newbrandForm.reset();
    this.sharedMobileService.initilizeFromGroup();
  }
}
