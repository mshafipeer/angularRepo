import { Component, OnInit } from '@angular/core';
import { IndexService } from '../index.service';
import { SignupModel } from './Singup.Model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  pageSize : 20; 
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 15);
  errorText : string;
  responseStatus : string;
  status : string;
  userName : string;
  name :string;
  phone :string;
  emailId : string;
  password : string;
  signupModel : SignupModel = new SignupModel();
  constructor(private indexService  :IndexService) {
    this.signupModel= new SignupModel();
   }
  respObj : any;
  ngOnInit( ) {
     
  }

  customerForm =  new FormGroup({
    id :  new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    middleName : new FormControl(),
    lastName : new FormControl(),
    contactNumber : new FormControl(),
    emailId : new FormControl(),
    customerArea : new FormControl(),
    customerAdress : new FormControl(),
    customerType : new FormControl(),
    createdDate : new FormControl(),
    modifiedDate : new FormControl(),
    deletionStatus : new FormControl(),
   });
     
  SingUpAction (){
      console.log("in SingUpAction component");
      this.indexService.getUserDetsils().subscribe (responseObj => {
      this.respObj = JSON.stringify(responseObj);
      this.phone = responseObj["id"];
      this.name = responseObj["name"];
      this.userName = responseObj["description"];
      this.emailId = responseObj["email"];
      this.password =responseObj["password"];
      console.log("responseObj List :" +JSON.stringify(responseObj));
      console.log("results description :" +responseObj["description"]);
      console.log("responseObj[header] :" + responseObj["headers"]);
      console.log("responseObj :" +JSON.stringify(responseObj));
      })
  }

  registerUser()
  {
       this.errorText = "Error Returned";
        this.indexService.registration(this.signupModel).subscribe(responseObj => {
        console.log("responseObj :" +JSON.stringify(responseObj));
        console.log("responseObj.body.status2 :" + responseObj.body.status);
        this.responseStatus = responseObj.status;
        this.errorText = responseObj.body.description; 
        this.status =   responseObj.body.status;
        console.log("responseObj.status4 :" + responseObj.body.status);
    },(err : HttpErrorResponse)=> {

      this.status = (err.status).toString();
      this.errorText = err.statusText;
 
      console.log("err.status :" + err.status);
      console.log("err.message :" + err.message);
      console.log("err.ok " + err.ok);
      console.log("err.statusText :" + err.statusText);
      console.log("err.type :" + err.type);
      console.log("err.headers :" + err.headers.getAll);
    });
  }

}
