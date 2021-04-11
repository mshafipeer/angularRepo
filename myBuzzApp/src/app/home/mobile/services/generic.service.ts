import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemCodeMstModel } from '../models/genericModels/SystemCodeMstModel';
import { Constants } from 'src/app/requestStucture/Constants';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { BrandModel } from '../models/brand/BrandModel';
  
@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http : HttpClient) { }
  // this bran=nbs are used by all compl=onents and all times so it should be loas=ded one time.
  allMobileBrands : BrandModel[];
  
  stsyemCodesToBeLoaded : string [];
  // productTypes : SystemCodeMstModel;
  // productQuality : SystemCodeMstModel;
  productTypes : SystemCodeMstModel = new SystemCodeMstModel();
  productQuality : SystemCodeMstModel = new SystemCodeMstModel();
  responseObject : ResponseObject;

 mstSystemCodeDetailsList : SystemCodeMstModel [];
 // mstSystemCodeDetailsList :  Array<SystemCodeMstModel>;

  getSystemCodeFromList(systemCodeModel : SystemCodeMstModel,systemCodeType :string){
    let systemCode = null;
    if(this.mstSystemCodeDetailsList && this.mstSystemCodeDetailsList.length >0 ){
       this.mstSystemCodeDetailsList.filter(systemCodeFromList => {
        if(systemCodeFromList.systemCodeType === systemCodeType){
          systemCodeModel = systemCodeFromList;
        }else{
          console.log("before loadSystemCode =>"+this.loadSystemCode);
          this.stsyemCodesToBeLoaded.push(Constants.PRODUCT_TYPE);
          console.log("after loadSystemCode =>"+this.loadSystemCode);
        }
      }); 
    }else{ 
      console.log("3 this.mstSystemCodeDetailsList  found invalid ojbect then load loadSystemCode");
     // this.loadSystemCode(systemCodeType);
      // .subscribe(sysCodeObj => {
      //   console.log("10 sysCodeObj =>"+sysCodeObj);
      //   if(this.isValidObject(sysCodeObj)){
      //     systemCodeModel =  sysCodeObj;
      //     let list = new Array(systemCodeModel);
      //     this.mstSystemCodeDetailsList1 = list;
      //     this.mstSystemCodeDetailsList = list;
      //     console.log("6 finally  this.mstSystemCodeDetailsList =>"+this.mstSystemCodeDetailsList);
      //     console.log("7 finally  this.mstSystemCodeDetailsList1 =>"+this.mstSystemCodeDetailsList1);
      //   }
      // });
    }
  }

  loadSystemCode(systemCodeType :string,productTypeTest : SystemCodeMstModel) {
    console.log("4 loadSystemCodes");
    let sysCodeDtls = null;
     this.getSystemCodesbyType(systemCodeType,UrlConstant.GET_SYSTEM_CODES_BY_TYPE).subscribe(responseObj=>{
      this.responseObject = responseObj as ResponseObject;
      if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
       // console.log(" 5 return this.responseObject.mstSystemCodeDetails =>"+JSON.stringify(this.responseObject.mstSystemCodeDetails));
       productTypeTest =  this.responseObject.mstSystemCodeDetails;
      // this.productTypes = this.responseObject.mstSystemCodeDetails;
       // return this.responseObject.mstSystemCodeDetails; 
      }else{
        console.log(" 66 system code not found for systemCodeType "+systemCodeType);
      }  
    });
   // return sysCodeDtls;
  }

  getSystemCodesbyType(systemCodeTypes : string,serviceName : string) : Observable<ResponseObject>{
    console.log(" 100 getSystemCodesbyType "+systemCodeTypes);
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),{"systemCodeType":systemCodeTypes});
  }

  isValidObject(object :any) : boolean {
    if(object != null && object != 'undefined'){
      return true;
    }else{ 
      return false; 
    }
  }

  isValidCollection(object :any) : boolean {
    if(object != null && object != 'undefined' && object.length > 0){
      return true;
    }else{  
      return false; 
    }
  }
   
  loadSystemCodesToLocalList(systemCodeTypes :string[]){
    console.log(" 1 loadSystemCodesToLocalList "+systemCodeTypes);
    var systemCodeNotExistsInList :boolean = true;
    if(this.isValidObject(systemCodeTypes)){
        console.log(" 1x !this.isValidObject(this.mstSystemCodeDetailsList) "+(!this.isValidObject(this.mstSystemCodeDetailsList)));
        console.log( " 1x2 this.mstSystemCodeDetailsList "+JSON.stringify(this.mstSystemCodeDetailsList));
        if(!this.isValidObject(this.mstSystemCodeDetailsList)){
          console.log(" 1x3 object is not7 valid ");
          this.loadSystemCodesTypesToLocalList(systemCodeTypes);
        }else{  
          // systemCodeTypes.forEach(systemCodeType => {
          //   console.log("  forEach outer systemCodeType -->"+systemCodeType);
          //    this.mstSystemCodeDetailsList.filter(function(mstSystemCode){
          //     if(mstSystemCode.systemCodeType === systemCodeType){
          //       systemCodeNotExistsInList= false;
          //     }
          //   });
          // });
          for(var i = 0 ;i < systemCodeTypes.length ;i++){
            for (var j = 0 ;j < this.mstSystemCodeDetailsList.length ;j++){
              if(systemCodeTypes[i] === this.mstSystemCodeDetailsList[j].systemCodeType){
                systemCodeNotExistsInList = false; 
              }
            }
          }
          // systemCodeTypes.forEach(systemCodeType => {
          //   console.log("  forEach outer 19 systemCodeType -->"+systemCodeType);
          //   this.mstSystemCodeDetailsList.forEach(mstSystemCode => {
          //     console.log(" forEach inner 20 mstSystemCode -->"+mstSystemCode.systemCodeType);
          //     console.log("334 comparision :"+systemCodeType+" === "+mstSystemCode.systemCodeType);
          //     if(mstSystemCode.systemCodeType === systemCodeType){
          //       console.log("systemcode found for :"+systemCodeType+" === "+mstSystemCode.systemCodeType);
          //       systemCodeNotExistsInList : false;
          //       console.log("changes in systemCodeNotExistsInList :"+systemCodeNotExistsInList); 
          //     }
          //   });
          // });
          console.log(" 55 execting from loadSystemCodesToLocalList with value "+systemCodeNotExistsInList);
          if(systemCodeNotExistsInList){
            console.log(" 56 execting from loadSystemCodesToLocalList with value "+systemCodeNotExistsInList);
            this.loadSystemCodesTypesToLocalList(systemCodeTypes);
          }  
        }  
    }
    console.log(" execting from loadSystemCodesToLocalList with value "+systemCodeNotExistsInList);
   
  }

   loadSystemCodesTypesToLocalList(systemCodeTypes : string[]){
    console.log(" 2 loadSystemCodesTypesToLocalList "+systemCodeTypes);
    this.getSystemCodesbyTypeList(systemCodeTypes,UrlConstant.GET_SYSTEM_CODES_LIST_BY_TYPES).subscribe(responseObj=>{
      this.responseObject = responseObj as ResponseObject;
      console.log(" 4 this.responseObject.responseCode "+this.responseObject.responseCode);
      if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
        if(this.isValidObject(this.responseObject.mstSystemCodeDetailsList)){ 
          if(this.isValidObject(this.mstSystemCodeDetailsList)){ 
            this.responseObject.mstSystemCodeDetailsList.forEach(mstSystemCodeDetails =>{
              console.log(" 88 responseObject.mstSystemCodeDetailsList.forEach "+ mstSystemCodeDetails.systemCodeType);
              this.mstSystemCodeDetailsList.push(mstSystemCodeDetails)
              console.log("99 loadSystemCodesTypesToLocalList "+JSON.stringify(this.mstSystemCodeDetailsList));
            });
          }else{
            console.log(" 5 this.isValidObject(this.mstSystemCodeDetailsList => "+this.isValidObject(this.mstSystemCodeDetailsList));
            this.mstSystemCodeDetailsList = this.responseObject.mstSystemCodeDetailsList; 
            console.log(" 5x this.mstSystemCodeDetailsList => "+JSON.stringify(this.mstSystemCodeDetailsList));
          }
          console.log(" this.productTypes =>"+JSON.stringify(this.productTypes));
          console.log(" this.productTypes.systemCodeDtlModel =>"+JSON.stringify(this.productTypes.dtlSystemCodeDetails));
        }  
        console.log(" yyyy this.isValidObject(this.mstSystemCodeDetailsList => "+this.isValidObject(this.mstSystemCodeDetailsList));
      }
    });
  }

  getSystemCodeFromListByType(mstSysCodeList :SystemCodeMstModel [] , systemCodeType :string){
    const indexedMstSystemCode = mstSysCodeList.find(function(mstSysCode,index){
      return mstSysCode.systemCodeType === systemCodeType;
   })
   return indexedMstSystemCode;
  }

  getSystemCodesbyTypeList(systemCodeTypes : string[],serviceName : string) : Observable<ResponseObject>{
    console.log(" 3 getSystemCodesbyTypeList getSystemCodesbyType "+systemCodeTypes);
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),systemCodeTypes);
  }
  getSystemCodesbyTypeList1(systemCodeTypes : string[],serviceName : string){
    console.log(" 3 getSystemCodesbyTypeList getSystemCodesbyType "+systemCodeTypes);
    return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),systemCodeTypes);
  }

  loadFormSystemCodes(systemCodeTypes : string []){
    this.getSystemCodesbyTypeList(systemCodeTypes,UrlConstant.GET_SYSTEM_CODES_LIST_BY_TYPES).subscribe(responseObj=>{
      this.responseObject = responseObj as ResponseObject;
      if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
        this.mstSystemCodeDetailsList = this.responseObject.mstSystemCodeDetailsList;
        if(this.isValidObject(this.mstSystemCodeDetailsList)){
           
          this.productTypes =this.getSystemCodeFromListByType
                    (this.mstSystemCodeDetailsList,Constants.PRODUCT_TYPE);
            
          this.productQuality = this.getSystemCodeFromListByType
                    (this.mstSystemCodeDetailsList,Constants.PRODUCT_QUALITY);

                //   this.genericService.mstSystemCodeDetailsList.forEach(mstSystemCode => {
                //   if(mstSystemCode.systemCodeType === Constants.PRODUCT_TYPE){
                //     this.genericService.productTypes = mstSystemCode;
                //     //return mstSystemCode;
                //   }else if(mstSystemCode.systemCodeType === Constants.PRODUCT_QUALITY){
                //     this.genericService.productQuality = mstSystemCode;
                //   // return mstSystemCode;
                //   }
                // });
        }else{
          console.log(" system code list not found "+this.mstSystemCodeDetailsList);
        }
      }else{
        console.log(" failed Resoponse code "+this.responseObject.responseCode);
      }  
    });
  }

  getMobileBrands(){ 
    if(!this.isValidCollection(this.allMobileBrands))
    {   
      alert("i am in to getBrandDetails");
      this.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => 
      {
        this.responseObject = responseObj as ResponseObject;
        if(this.responseObject){
          this.allMobileBrands = this.responseObject.brandDetailsList;
        }
        console.log("responseObj :" , responseObj);
      },error => { 
        this.allMobileBrands = this.defaultBrand; 
      });
    } 
  }

  getBrandDetails(serviceName : string) : Observable<ResponseObject>{
    return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
  }

  defaultBrand: any[] = [
    {id: 1, brandName: 'Samsung',brandDiscription: "default brand",deletionStatus :'N'},
    {id: 2, brandName: 'Nokia', brandDiscription: "default brand",deletionStatus :'N'},
    {id: 3, brandName: 'Apple', brandDiscription: "default brand",deletionStatus :'N'}
  ];

  defaultSystemCodeMstModel: SystemCodeMstModel[] = 
  [
    {"systemCodeId": 4, "systemCodeType":'Test_SystemCode', "systemCodeDesc": "default Desc","deletionStatus" :'N',"dtlSystemCodeDetails":null},
  ];

}




















// getSystemCodeFromList(systemCodeModel : SystemCodeMstModel,systemCodeType :string){
//   let systemCode = null;
//   if(this.mstSystemCodeDetailsList && this.mstSystemCodeDetailsList.length >0 ){
//      this.mstSystemCodeDetailsList.filter(systemCodeFromList => {
//       if(systemCodeFromList.systemCodeType === systemCodeType){
//         systemCodeModel === systemCodeFromList;
//       }else{
//         console.log("before loadSystemCode =>"+this.loadSystemCode);
//         this.stsyemCodesToBeLoaded.push(Constants.PRODUCT_TYPE);
//         console.log("after loadSystemCode =>"+this.loadSystemCode);
//       }
//     }); 
//   }else{ 
//     console.log("3 this.mstSystemCodeDetailsList  found invalid ojbect then load loadSystemCode");
//     this.loadSystemCode(systemCodeType).subscribe(sysCodeObj => {
//       console.log("10 sysCodeObj =>"+sysCodeObj);
//       if(this.isValidObject(sysCodeObj)){
//         systemCodeModel =  sysCodeObj;
//         let list = new Array(systemCodeModel);
//         this.mstSystemCodeDetailsList1 = list;
//         this.mstSystemCodeDetailsList = list;
//         console.log("6 finally  this.mstSystemCodeDetailsList =>"+this.mstSystemCodeDetailsList);
//         console.log("7 finally  this.mstSystemCodeDetailsList1 =>"+this.mstSystemCodeDetailsList1);
//       }
//     });
//   }
// }

// loadSystemCode(systemCodeType :string) {
//   console.log("4 loadSystemCodes");
//   let sysCodeDtls = null;
//    this.getSystemCodesbyType(systemCodeType,UrlConstant.GET_SYSTEM_CODES_BY_TYPE).subscribe(responseObj=>{
//     this.responseObject = responseObj as ResponseObject;
//     if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
//      // console.log(" 5 return this.responseObject.mstSystemCodeDetails =>"+JSON.stringify(this.responseObject.mstSystemCodeDetails));
//       this.productTypes = this.responseObject.mstSystemCodeDetails;
//      // return this.responseObject.mstSystemCodeDetails; 
//     }else{
//       console.log(" 66 system code not found for systemCodeType "+systemCodeType);
//     }  
//   });
//   return sysCodeDtls;
// }


