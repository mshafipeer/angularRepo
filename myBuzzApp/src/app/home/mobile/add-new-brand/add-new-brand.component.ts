//using template driven approach
 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { Constants } from 'src/app/requestStucture/Constants';


@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss']
})
export class AddNewBrandComponent implements OnInit {
   responseMsg : string;
   errorCode :string;
   errorMsg : string;
   isdisabledBysever : true;
   appearance : string ="legacy";
   fontSize : number = Math.max(10, 15);
   
   responseObject : ResponseObject;
   newbrandForm =  new FormGroup({
   brandName: new FormControl(),
   brandDiscription : new FormControl()
  });

  constructor(private mobileSrv : MobileService,private _snackBar: MatSnackBar){
   }
  ngOnInit() {
  }

  onSubmit(newbrandForm) 
  {
      //console.log("before  ", JSON.stringify(newbrandForm.value));
      this.responseMsg = null; 
      this.errorMsg = null;
      this.mobileSrv.addNewBrandDetails(newbrandForm.value,UrlConstant.ADD_BRAND_DETAILS).subscribe(responseObj => 
      {
          this.responseObject =  responseObj.body as ResponseObject;
          if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
            this.openSnackBar(Constants.RECORD_UPDATED_SUCESSFULLY,"close");
          }else{
            this.errorMsg = this.responseObject.responseDesc;
            this.openSnackBar(this.errorMsg ,"close");
            newbrandForm.resetForm();
          }
          console.log("responseObj.status :" + responseObj.status);
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

}
