import { Component, OnInit } from '@angular/core';
import { ProductStockService } from '../../shared/product-stock.service';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-modify-stock',
  templateUrl: './modify-stock.component.html',
  styleUrls: ['./modify-stock.component.scss']
})
export class ModifyStockComponent implements OnInit {
  sucessMsg : string; 
  errorMsg :  string;  
  errorCode : string;
  appearance : string ="legacy";
  responseObject : ResponseObject;
  fontSize : number = Math.max(10, 15);
  loadFormSystemCodes : string[] = ['product_type','product_quality'];
  constructor(public  productStockService : ProductStockService ,
    public genericService : GenericService,
    private notificationSrv : NotificationService,
    public  dialogRef : MatDialogRef<ModifyStockComponent>) { }
 
  ngOnInit() { 
    if(!this.genericService.isValidCollection(this.genericService.productTypes)){
      console.log("systemCodeCalled");
      this.genericService.loadFormSystemCodes(this.loadFormSystemCodes);
    }
  }
  
  onSubmit(form){
    this.sucessMsg = null; 
    this.errorMsg = null; 
    this.getProductRefrence();
    this.productStockService.addStockDetails(form.value,UrlConstant.ADD_PRODUCT_STOCK_DETAILS).subscribe(responseObj => {
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
      },
      error => {
        this.errorMsg = error.statusText;
        console.log("error results :" , error);
     });
  }

  searchModelsByBrandOnChange(){ 
    let brandId = this.productStockService.form.get('brandId').value;
    this.productStockService.searchModelsByBrand(brandId, UrlConstant.GET_MODELS_BY_BRAND_NAME);
  }
 
  searchSparePartsByModelOnChange(){
    let modelId = this.productStockService.form.get('modelId').value; 
    this.productStockService.searchSparePartsByModel(modelId,UrlConstant.GET_SPARE_PARTS_BY_MODEL);
  } 

  closeDialog()  
  { 
    this.productStockService.form.reset();
    this.productStockService.initilizeFromGroup();
    this.dialogRef.close();
  }
  
  onClear(){
    this.notificationSrv.sucess(":: Submitted sucessfully");
    this.productStockService.form.reset();
    this.productStockService.initilizeFromGroup();
  }

  setWholeSaleBuy(){
   // ref=(this.productStockService.form.get('brandId').value);
    this.productStockService.form.controls['wholeSaleBuy'].patchValue(this.productStockService.form.get('retailBuy').value);
  }  

  getRetailBuyPercentage(){ 
    let retailBuy : number =(this.productStockService.form.get('retailBuy').value);
    if(retailBuy){ 
       let retailSell = (this.productStockService.form.get('retailSell').value);
       if (retailSell ){
        if (retailSell.indexOf('%') > -1){  
           let percentageAmt =  retailSell.substring(0,retailSell.length-1); 
           let totalAmt : number = +((retailBuy * percentageAmt )/100) + +retailBuy;
           this.productStockService.form.controls['retailSell'].patchValue(totalAmt);
        }
       }
    } 
  } 
    
  getWholeSaleBuyPercentage(){ 
    let wholeSaleBuy : number = (this.productStockService.form.get('wholeSaleBuy').value);
    if(wholeSaleBuy){
       let wholeSaleSell = (this.productStockService.form.get('wholeSaleSell').value);
       if (wholeSaleSell ){
        if (wholeSaleSell.indexOf('%') > -1){  
           let percentageAmt =  wholeSaleSell.substring(0,wholeSaleSell.length-1); 
           let totalAmt : number = +((wholeSaleBuy * percentageAmt )/100) + +wholeSaleBuy;
           this.productStockService.form.controls['wholeSaleSell'].patchValue(totalAmt);
        }
       }
    }
  }  

  getProductRefrence(){
    let brandId  = (this.productStockService.form.get('brandId').value) ? (this.productStockService.form.get('brandId').value) : '';
    let modelId = (this.productStockService.form.get('modelId').value) ? (this.productStockService.form.get('modelId').value) : '' ;
    let sparePartId = (this.productStockService.form.get('sparePartId').value) ? (this.productStockService.form.get('sparePartId').value) :'' ;
    let productQuality = (this.productStockService.form.get('productQuality').value) ? (this.productStockService.form.get('productQuality').value) : '';
    let invoiceId = (this.productStockService.form.get('invoiceId').value) ?  (this.productStockService.form.get('invoiceId').value) : '';
    let ref =  brandId.concat(modelId).concat(sparePartId).concat(productQuality).concat(invoiceId);
    this.productStockService.form.controls['productRefrence'].patchValue(ref); 
  } 

  checkInvoiveExists() 
  {
    this.errorMsg = null;
    let brandId = this.productStockService.form.get('brandId').value;
    let modelId = this.productStockService.form.get('modelId').value;
    let sparePartId = this.productStockService.form.get('sparePartId').value; 
    let refrenceNumber = brandId+""+modelId+""+sparePartId;
    let invoiceNumber = this.productStockService.form.get('invoiceNumber').value ;
    //let refrenceNumber = this.productStockService.form.controls['productRefrence'].value;
    if(invoiceNumber){ 
      this.productStockService.validateAllFeilds = true;
      this.productStockService.checkInvoiceByInvoiceNumber(invoiceNumber,UrlConstant.GET_INVOICE_DETAILS_BY_INVOICE_NUMBER).subscribe(responseObj => 
      { 
        console.log("responseObj  getinvoiceDetails :" , JSON.stringify(responseObj));
        this.responseObject = responseObj as ResponseObject;
        if(this.responseObject && "00" === this.responseObject.responseCode && this.responseObject.invoiceDetails){
          this.productStockService.form.controls['invoiceId'].patchValue(this.responseObject.invoiceDetails.id);
          this.getProductRefrence();
          //let invoiceId = this.responseObject.invoiceDetails.id;
          //this.productStockService.form.controls['productRefrence'].patchValue(refrenceNumber+invoiceId); 
        }else{
          this.productStockService.validateAllFeilds = false;
          this.notificationSrv.sucess("Invoive number "+ invoiceNumber+" does not exists");
          this.getProductRefrence();
          //this.productStockService.form.controls['productRefrence'].patchValue(refrenceNumber); 
          //this.productStockService.form["invoiveNumber"].focus();
        }
      }, error => {
           this.errorMsg = error.status;
           console.log("error results :" , error);
      });
    }
    
  }

  searchInvoiceDialog(){

  }
  
}
