import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { NotificationService } from '../services/notification.service';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { Constants } from 'src/app/requestStucture/Constants';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-add-new-stock',
  templateUrl: './add-new-stock.component.html',
  styleUrls: ['./add-new-stock.component.scss']
})
export class AddNewStockComponent implements OnInit {

allMobileBrands: any[];
allMobileModels: any[];
allSpareParts : any[];

//productTypes : SystemCodeMstModel;

  constructor(private mobileSrv : MobileService, private notificationSrv : NotificationService,
              public  genericService : GenericService) {  
 
               // this.genericService.mstSystemCodeDetailsList = null;
              //   // defaultSystemCodeMstModel 
              //   this.genericService.mstSystemCodeDetailsList = this.genericService.defaultSystemCodeMstModel;
              //   console.log("wow this.genericService.mstSystemCodeDetailsList" + JSON.stringify(this.genericService.mstSystemCodeDetailsList));
              //   this.genericService.loadSystemCodesToLocalList(this.loadFormSystemCodes);
              //   //this.loadSystemCodes1();
             
              // // this.genericService.loadSystemCodesToLocalList(this.loadFormSystemCodes);
              //   console.log("finallly mstSystemCodeDetailsList" + JSON.stringify(this.genericService.mstSystemCodeDetailsList));
              
              }  
  responseMsg: string;
  errorMsg : string;
  errorCode : string;
  appearance : string ="legacy";
  fontSize : number = Math.max(10, 14);
  responseObject : ResponseObject;
  validateAllFeilds : boolean = true;
  loadFormSystemCodes : string[] = ['PRODUCT_TYPE','PRODUCT_QUALITY'];

  stockForm =  new FormGroup({
    productType: new FormControl('4'),
    brandId: new FormControl(),
    modelId: new FormControl(),
    sparePartId : new FormControl(),
    productQuality: new FormControl(),
    retailBuy : new FormControl(),
    retailSell : new FormControl(),
    wholeSaleBuy : new FormControl(),
    wholeSaleSell :new FormControl(),
    invoiceId : new FormControl(),
    invoiceNumber : new FormControl(),
    quantity : new FormControl(),
    productRefrence : new FormControl(),
    notes : new FormControl()
   });
    
  ngOnInit() { 
    // this.genericService.mstSystemCodeDetailsList = null;
    //  //defaultSystemCodeMstModel  
    //  console.log("first mstSystemCodeDetailsList" + JSON.stringify(this.genericService.mstSystemCodeDetailsList));
    //  this.genericService.mstSystemCodeDetailsList = this.genericService.defaultSystemCodeMstModel;
    //  console.log("wow this.genericService.mstSystemCodeDetailsList" + JSON.stringify(this.genericService.mstSystemCodeDetailsList));
    //  this.genericService.loadSystemCodesToLocalList(this.loadFormSystemCodes);
    
    if(!this.genericService.isValidCollection(this.genericService.productTypes)){
      console.log("systemCodeCalled");
      this.genericService.loadFormSystemCodes(this.loadFormSystemCodes);
    }
    this.getMobileBrands();

   // this.genericService.loadSystemCodesToLocalList(this.loadFormSystemCodes);
    console.log("finallly mstSystemCodeDetailsList" + JSON.stringify(this.genericService.mstSystemCodeDetailsList));
  } 
  
  onSubmit(stockForm)
  {
      //this.validateProductRefrence(stockForm);
      this.getProductRefrence();
      this.responseMsg = null; 
      this.errorMsg = null;
      this.mobileSrv.addProductStockDetails(stockForm.value,UrlConstant.ADD_PRODUCT_STOCK_DETAILS).subscribe(responseObj => {
          this.responseObject = responseObj.body as ResponseObject;
          if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
            this.mobileSrv.openSnackBar(Constants.RECORD_INSERTED_SUCESSFULLY,"close");
          }else{
            this.errorMsg = this.responseObject.responseDesc;
            this.mobileSrv.openSnackBar(this.errorMsg ,"close");
          }
        },
        error => {
          this.errorMsg = error.status;
          console.log("error results :" , error);
       }); 
  }

  getProductRefrence(){
    let brandId  = (this.stockForm.get('brandId').value) ? (this.stockForm.get('brandId').value) : '';
    let modelId = (this.stockForm.get('modelId').value) ? (this.stockForm.get('modelId').value) : '' ;
    let sparePartId = (this.stockForm.get('sparePartId').value) ? (this.stockForm.get('sparePartId').value) :'' ;
    let productQuality = (this.stockForm.get('productQuality').value) ? (this.stockForm.get('productQuality').value) : '';
    let invoiceId = (this.stockForm.get('invoiceId').value) ?  (this.stockForm.get('invoiceId').value) : '';
    let ref =  brandId.concat(modelId).concat(sparePartId).concat(productQuality).concat(invoiceId);
    this.stockForm.controls['productRefrence'].patchValue(ref); 
  }


  refreshRefrence(){
    let brandId  = (this.stockForm.get('brandId').value);
    let modelId = (this.stockForm.get('modelId').value);
    let sparePartId = (this.stockForm.get('sparePartId').value);
    let productQuality = (this.stockForm.get('productQuality').value);
    brandId.concat(modelId).concat(sparePartId).concat(productQuality);
    this.stockForm.controls['productRefrence'].patchValue("");
  }

  getMobileBrands()
  {  
      if(this.allMobileBrands === undefined ){
        this.mobileSrv.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => {
          console.log(" getMobileBrands responseObj :" , responseObj);
          this.responseObject = responseObj as ResponseObject;
          if(this.responseObject){
            this.allMobileBrands = this.responseObject.brandDetailsList;
          }
        }, error => {
          console.log("error results :" , error); 
          if("Unknown Error"=== error.statusText){
            this.allMobileBrands = this.mobileSrv.defaultBrand;
          }else{
            this.errorMsg = error.statusText;
          }
       });
      }   
   }
 
   getModelsByBrand(){
     if(this.stockForm.get('brandId').value){
        this.mobileSrv.getAllModelsByBrand(this.stockForm.get('brandId').value,UrlConstant.GET_MODELS_BY_BRAND_NAME).subscribe(responseObj => {
           this.responseObject = responseObj as ResponseObject;
           if(this.responseObject){
            this.allMobileModels = this.responseObject.productModelDetailsList;
           }
        }, error => {
             this.errorMsg = error.status;
             console.log("error results :" , error);
        });
     }
    
  } 

  getSparePartsByBrandIdAndModelId()
  {
    if(this.stockForm.get('modelId').value){
      this.mobileSrv.getSparePartsByModelId(this.stockForm.get('modelId').value,UrlConstant.GET_SPARE_PARTS_BY_MODEL).subscribe(responseObj => {
        console.log("responseObj  getAllModelsByBrand :" , JSON.stringify(responseObj));
        this.responseObject = responseObj as ResponseObject;
        if(this.responseObject){
          this.allSpareParts = this.responseObject.productPartDetailsList;
        }
       }, error => {
            this.errorMsg = error.status;
            console.log("error results :" , error);
       });
    }
    
  }

  checkInvoiveExists() 
  {  
    this.errorMsg = null;
    //let refrenceNumber = (this.stockForm.get('brandId').value) + (this.stockForm.get('modelId').value) + (this.stockForm.get('sparePartId').value);
    let invoiceNumber = this.stockForm.get('invoiceNumber').value; 
    invoiceNumber = invoiceNumber.replace(/\s/g, "");
    if(invoiceNumber){
      this.validateAllFeilds = true;
      this.mobileSrv.checkInvoiceByInvoiceNumber(this.stockForm.get('invoiceNumber').value,UrlConstant.GET_INVOICE_DETAILS_BY_INVOICE_NUMBER).subscribe(responseObj => {
        this.responseObject = responseObj as ResponseObject;  
        if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode && this.responseObject.invoiceDetails){
          this.stockForm.controls['invoiceId'].patchValue(this.responseObject.invoiceDetails.id);
          this.getProductRefrence();
          //let invoiceNumber = this.responseObject.invoiceDetails.invoiceNumber;
          //this.stockForm.controls['productRefrence'].patchValue(refrenceNumber+invoiceNumber);
        }else{  
          this.stockForm.controls['invoiceNumber'].patchValue("");
          //this.stockForm.controls['productRefrence'].patchValue(refrenceNumber); 
          this.getProductRefrence();
          this.mobileSrv.openSnackBar("Invoive number1 "+ invoiceNumber+" does not exists" ,"close");
        } 
      }, error => {
           this.errorMsg = error.status;
           console.log("error results :" , error);
      });
    }
  }

  getRetailBuyPercentage(){ 
    let retailBuy : number =(this.stockForm.get('retailBuy').value);
    if(retailBuy){
       let retailSell = (this.stockForm.get('retailSell').value);
       if (retailSell ){
        if (retailSell.indexOf('%') > -1){  
           let percentageAmt =  retailSell.substring(0,retailSell.length-1); 
           let totalAmt : number = +((retailBuy * percentageAmt )/100) + +retailBuy;
           this.stockForm.controls['retailSell'].patchValue(totalAmt);
        }
       }
    }
  }   
  
  setWholeSaleBuy(){
    this.stockForm.controls['wholeSaleBuy'].patchValue(this.stockForm.get('retailBuy').value);
   }  

   setWholeSaleSell(){
    // ref=(this.productStockService.form.get('brandId').value);
    this.stockForm.controls['wholeSaleBuy'].patchValue(this.stockForm.get('retailBuy').value);
   }  

   getWholeSaleBuyPercentage(){ 
    let wholeSaleBuy : number = (this.stockForm.get('wholeSaleBuy').value);
    if(wholeSaleBuy){
       let wholeSaleSell = (this.stockForm.get('wholeSaleSell').value);
       if (wholeSaleSell ){
        if (wholeSaleSell.indexOf('%') > -1){  
           let percentageAmt =  wholeSaleSell.substring(0,wholeSaleSell.length-1); 
           let totalAmt : number = +((wholeSaleBuy * percentageAmt )/100) + +wholeSaleBuy;
           this.stockForm.controls['wholeSaleSell'].patchValue(totalAmt);
        }
       }
    }
  }
  
  searchInvoiceDialog(){
    
  }

  //  loadSystemCodes111(){
  //   console.log("loadSystemCodes");
  //   let prodyctType ='PRODUCT_QUALITITY';
  //   this.mobileSrv.getSystemCodesbyTypes(prodyctType,UrlConstant.GET_SYSTEM_CODES_BY_TYPE).subscribe(responseObj=>{
  //     this.responseObject = responseObj as ResponseObject;
  //     if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
  //       this.productTypes = this.responseObject.mstSystemCodeDetails; 

  //       console.log(" this.productTypes =>"+JSON.stringify(this.productTypes));
  //       console.log(" this.productTypes.systemCodeDtlModel =>"+JSON.stringify(this.productTypes.dtlSystemCodeDetails));
  //     } 
  //   });
  // }

  loadSystemCodes(){ 
    console.log(" 1 loadSystemCodes");
    let prodyctType = 'PRODUCT_QUALITITY';
    if(!this.isValidObject(this.genericService.productTypes)){
        console.log(" 2 this.productTypes is null then call getSystemCodeFromList=>"+JSON.stringify(this.genericService.productTypes));
        this.genericService.getSystemCodeFromList(this.genericService.productTypes ,Constants.PRODUCT_TYPE);
        console.log(" at last this.genericService.productTypes found as  "+JSON.stringify(this.genericService.productTypes));
    }else{ 
      console.log(" end of loadSystemCodes");
    }
  }

  loadSystemCodes1(){ // moved to service in loadFormSystemCodes
    this.genericService.getSystemCodesbyTypeList(this.loadFormSystemCodes,UrlConstant.GET_SYSTEM_CODES_LIST_BY_TYPES).subscribe(responseObj=>{
      this.responseObject = responseObj as ResponseObject;
      if(Constants.SUCESS_RESPONSE_CODE == this.responseObject.responseCode){
        this.genericService.mstSystemCodeDetailsList = this.responseObject.mstSystemCodeDetailsList;
        if(this.genericService.isValidObject(this.genericService.mstSystemCodeDetailsList)){
           
          this.genericService.productTypes =this.genericService.getSystemCodeFromListByType
                    (this.genericService.mstSystemCodeDetailsList,Constants.PRODUCT_TYPE);
            
          this.genericService.productQuality = this.genericService.getSystemCodeFromListByType
                    (this.genericService.mstSystemCodeDetailsList,Constants.PRODUCT_QUALITY);

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
          console.log(" system code list not found "+this.genericService.mstSystemCodeDetailsList);
        }
      }else{
        console.log(" failed Resoponse code "+this.responseObject.responseCode);
      }  
    });
  }



  isValidObject(object :any) : boolean {
    if(object != null && object != 'undefined'){
      return true;
    }else{
      return false; 
    }


  }
  
}
  
