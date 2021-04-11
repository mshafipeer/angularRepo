import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginDAO } from './loginDAO.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorText: string;
  public loginDao : LoginDAO;
  constructor(public authservice: AuthService, public router: Router) {
    this.loginDao = new LoginDAO();
    // this.loginDao.indexObj.errorCode= "test Error Code";
    // this.loginDao.indexObj.errorMsg = "test Error Msh";
  }

  public userInfo: object;

  public LoginDAOCopy = {
    email  : "",
    password : "",
    errorText : ""
  }
  public responseData = {
    "name": '',
    "id": "",
    "token": "",
    "erroMsg": ""
  };

  ngOnInit() {
  }

  loginAction() {
    if (this.loginDao.email && this.loginDao.password)
    {
      this.loginDao.errorText = "";
      console.log("DAO values fffffff :"+JSON.stringify(this.loginDao.indexObj)); 
      console.log("DAO values fffffff1 :"+JSON.stringify(this.loginDao));
      console.log("LoginDAOCopy values before assinment "+ JSON.stringify (this.LoginDAOCopy));
      this.LoginDAOCopy = this.loginDao;
      console.log("LoginDAOCopy values after assinment "+ JSON.stringify (this.LoginDAOCopy));
      
  
      if (this.authservice.login(this.loginDao.email)) 
      {
        //direct call
        //  this.responseData = this.authservice.getUserDate1();
        //  console.log("this.responseData :" + this.responseData);
        //  console.log("this.responseData.erroMsg :" + this.responseData.erroMsg);
        //  if(this.responseData.erroMsg && this.responseData.erroMsg.length > 0) {
        //     this.errorText = this.responseData.erroMsg;
        //     this.authservice.logout();
        //     this.router.navigate(['/login']);
        //     } else {
        //     this.router.navigate(['']);
        //   }

        // promise call
          this.authservice.getUserDate().then(data => {
              this.responseData = data;
              console.log("this.responseData.erroMsg :" + this.responseData.erroMsg);
              if(this.responseData.erroMsg && this.responseData.erroMsg.length > 0) {
                 this.loginDao.errorText = this.responseData.erroMsg;
                 this.authservice.logout();
                 this.router.navigate(['/login']);
              } else {
                this.router.navigate(['']);
              } 
            });
      }
    } else {
      this.loginDao.errorText = "please Enter the valid input";
    }
  }

}
