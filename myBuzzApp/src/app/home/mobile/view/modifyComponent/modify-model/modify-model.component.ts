import { Component, OnInit } from '@angular/core';
import { ModelDetailService } from '../../shared/model-detail.service';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Component({
  selector: 'app-modify-model',
  templateUrl: './modify-model.component.html',
  styleUrls: ['./modify-model.component.scss']
})
export class ModifyModelComponent implements OnInit {
  sucessMsg : string; 
  errorMsg :  string;
  errorCode : string;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);
   constructor(public  modelDetailService : ModelDetailService ,
    private notificationSrv : NotificationService,
    public  dialogRef : MatDialogRef<ModifyModelComponent>) { }

  ngOnInit() {
  }

  onSubmit(modelForm){
    this.sucessMsg = null; 
    this.errorMsg = null; 
    this.modelDetailService.addModelDetails(modelForm.value,UrlConstant.ADD_MODEL_DETAILS).subscribe(responseObj => {
        console.log("responseObj :" , JSON.stringify(responseObj));
        this.errorCode = responseObj.responseCode;
        if("00"== responseObj.body.responseCode){
          this.sucessMsg = responseObj.body.responseMessage;
          this.notificationSrv.sucess(this.sucessMsg);
          this.closeDialog();
        }else{
          this.errorMsg = responseObj.body.responseMessage;
          this.notificationSrv.sucess(this.errorMsg);
        }
        console.log("responseObj.status :" + responseObj.status);
      },
      error => {
        this.errorMsg = error.status;
        console.log("error results :" , error);
     });
  }


  closeDialog()  
  { 
    this.modelDetailService.modelForm.reset();
    this.modelDetailService.initilizeFromGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.notificationSrv.sucess(":: Submitted sucessfully");
    this.modelDetailService.modelForm.reset();
    this.modelDetailService.initilizeFromGroup();
  }



}
