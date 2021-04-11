import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexheaderComponent } from './shared/header/indexheader/indexheader.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MaterialModule } from '../home/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
 
@NgModule({ 
  declarations: 
  [
    LoginComponent, 
    SignupComponent,
    ForgotComponent,
    IndexheaderComponent,
    UserloginComponent
  ],
  imports: [
    MaterialModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class IndexModule { }
