import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http : HttpClient) { }

  getSystemCodesbyType(systemCodeTypes : string,serviceName : string) : Observable<ResponseObject>{
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),{"systemCodeType":systemCodeTypes});
  }
 
  saveFormDetails(form : any,serviceName : string) : Observable<any>{
    return this.http.post<any>(UrlConstant.URL.concat(serviceName),form,{observe: 'response'});
  }
}
