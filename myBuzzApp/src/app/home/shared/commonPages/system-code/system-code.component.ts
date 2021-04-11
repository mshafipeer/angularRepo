import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemCodeMstModel } from 'src/app/home/mobile/models/genericModels/SystemCodeMstModel';
import { SystemCodeDtlModel } from 'src/app/home/mobile/models/genericModels/SystemCodeDtlModels';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/home/homeServices/common.service';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { Constants } from 'src/app/requestStucture/Constants';
import { NotificationService } from 'src/app/home/mobile/services/notification.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-system-code',
  templateUrl: './system-code.component.html',
  styleUrls: ['./system-code.component.scss']
})
export class SystemCodeComponent implements OnInit {
  responseObject: ResponseObject;

  constructor(private commonService : CommonService,private notificationService : NotificationService) { 
    console.log("helooo");
  }
  // PRODUCT_TYPE
  isWait = false;
  errorMsg : string ;
  isValidCode : boolean = false;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);
  color: string = "primary";
  
  systemCodeMstDetails : SystemCodeMstModel = new SystemCodeMstModel();
  dtlSystemCodeDetails  = new SystemCodeDtlModel();

  // dtlSystemCodeDetailsList : SystemCodeDtlModel[] = [];
  // dtlSystemCodeDetails1  = new SystemCodeDtlModel();

  dataArray = [];
 public mySysCodes : FormArray;
  form =  new FormGroup({
    systemCodeDtlId: new FormControl(),
    systemCodeId :  new FormControl(),
    valueCode :  new FormControl(),
    value :  new FormControl(),
    deletionStatus : new FormControl()
   });
 
  ngOnInit() {
    this.systemCodeMstDetails.systemCodeType = 'PRODUCT_TYPE';

        // this.mySysCodes = new FormArray([
        //     new FormGroup ({
        //     name : new FormControl('sadasdasdsad'),
        //     season :  new FormControl('asdasdasdasd'),
        //   })
        // ]);

        //this.mySysCodes.insert({});
 
   //this.dtlSystemCodeDetailsList.push(this.form.value);
  // this.dataArray.push(this.dtlSystemCodeDetails);
   
  }

  addNewRow(){
    this.errorMsg = null;
    this.dtlSystemCodeDetails = new SystemCodeDtlModel();
    this.dtlSystemCodeDetails.systemCodeId = this.systemCodeMstDetails.systemCodeId;
    this.dtlSystemCodeDetails.deletionStatus='N';
    this.dataArray.push(this.dtlSystemCodeDetails);
    // this.dtlSystemCodeDetails = new SystemCodeDtlModel();
    // this.dtlSystemCodeDetailsList.push(this.dtlSystemCodeDetails);
    this.systemCodeMstDetails.dtlSystemCodeDetails = this.dataArray;
    console.log(" this.dtlSystemthis.dataArray HHahh = ",JSON.stringify( this.systemCodeMstDetails));
  }  

  deleteRow(rowIndex, row :SystemCodeDtlModel){
    let systemCodeDtlId = row.systemCodeDtlId;
    if(systemCodeDtlId && systemCodeDtlId > 0){
      row.deletionStatus ='Y';
      this.dataArray[rowIndex] = row;
      console.log("this.dataArray after deleting statys Y :"+ JSON.stringify(this.dataArray));
    }else{
      this.dataArray.splice(rowIndex,1);  
      console.log("deletef from array  :");
    }
  }

  onSubmit(){
    console.log("on onSubmit value :",JSON.stringify(this.systemCodeMstDetails))
  }

  getSystemCodeDetails(){
    
    this.errorMsg = null;
    console.log(" i am in getSystemCodeDetails with this.systemCodeMstDetails [=>"+JSON.stringify(this.systemCodeMstDetails));
    let systemCodeType = this.systemCodeMstDetails.systemCodeType;
    if(systemCodeType){
      this.isWait = true;
      this.commonService.getSystemCodesbyType(systemCodeType,UrlConstant.GET_SYSTEM_CODES_BY_TYPE).subscribe(responseObj=>{
        this.responseObject = responseObj as ResponseObject;
         console.log(" this.responseObject from srvr =>"+JSON.stringify(this.responseObject));
        if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
         // console.log(" 5 return this.responseObject.mstSystemCodeDetails =>"+JSON.stringify(this.responseObject.mstSystemCodeDetails));
         this.systemCodeMstDetails =  this.responseObject.mstSystemCodeDetails;
         this.dataArray = this.systemCodeMstDetails.dtlSystemCodeDetails;
         this.isValidCode = true;
         console.log(" this.systemCodeMstDetails from server =>"+JSON.stringify(this.systemCodeMstDetails));
        }else{
          this.errorMsg = this.responseObject.responseDesc;
          this.dataArray.length = 0;
          console.log(" 66 system code not found for systemCodeType "+this.errorMsg);
        }
        this.isWait = false;  
      },error =>{
        this.isWait = false;
        this.errorMsg = error.statusText;
        // console.log("error.statusText:" , error.statusText);
        // console.log("error results  sadasd:" , error);
      });
    }
  }

  saveDetails() 
  {
    this.systemCodeMstDetails.dtlSystemCodeDetails= this.dataArray;
      this.errorMsg = null;
      console.log("in saveDetails =>",JSON.stringify(this.systemCodeMstDetails));
      this.commonService.saveFormDetails(this.systemCodeMstDetails,UrlConstant.SAVE_SYSTEM_CODE_DETAILS).subscribe(responseObj => 
      { 
          console.log("after save method =>"+JSON.stringify(responseObj.body));
          this.responseObject =  responseObj.body as ResponseObject;
          if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
            this.dataArray.length =0;
            this.notificationService.sucess(Constants.RECORD_UPDATED_SUCESSFULLY);
          }else{
            this.errorMsg = this.responseObject.responseDesc;
            this.notificationService.sucess(this.errorMsg);
          }
          console.log("responseObj.status :" + responseObj.status);
      },
      error => {
          this.errorMsg = error.status;
          console.log("error results :" , error);
      });
  }

  onCreate(){
    
  }

}
