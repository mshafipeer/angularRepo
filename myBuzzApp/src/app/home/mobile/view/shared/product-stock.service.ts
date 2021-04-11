import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockModel } from '../../models/stock/StockModel';
import { BrandModel } from '../../models/brand/BrandModel';
import { ProductModel } from '../../models/modelDetails/ProductModel';
import { ProductPartModel } from '../../models/spareParts/ProductPartsModel';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';

@Injectable({
  providedIn: 'root'
}) 
export class ProductStockService {

   allMobileBrands : BrandModel[];
   allMobileModels : ProductModel[];
   allMobileSpareParts : ProductPartModel[];
   addDialogCalled : boolean = false;
   sharedBrandName : string; 
   sharedModelName : string; 
   stockModel : StockModel;
   
   validateAllFeilds : boolean = true;
   responseObject : ResponseObject;
   errorMsg : string;

  constructor(private http : HttpClient) { }
    form =  new FormGroup({
      id : new FormControl(),
      productType : new FormControl() ,
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
      soldQuantity :new FormControl(),
      productRefrence : new FormControl(),
      notes : new FormControl(),
      cretedUserId : new FormControl(),
      deletionStatus : new FormControl(),
      productTypeDetails : new FormControl(),
      productQualityDetails : new FormControl(), 
      productPartDetails : new FormControl()

    });

    initilizeFromGroup(){
      this.form.setValue({
        id : null,
        productType: '',
        brandId: '',
        modelId: '',
        sparePartId : '',
        productQuality: '',
        retailBuy : '',
        retailSell : '',
        wholeSaleBuy : '',
        wholeSaleSell : '',
        invoiceId : '',
        invoiceNumber : '',
        quantity : '',
        soldQuantity : '',
        productRefrence : '', 
        notes : '',
        cretedUserId : null,
        productTypeDetails : null,
        productQualityDetails : null, 
        productPartDetails : null,
        deletionStatus : 'N',
      });
    }
 
    populateForm(row){
      this.form.setValue(row);
    }

    addStockDetails(form : any,serviceName : string) : Observable<any>{
      return this.http.post<any>(UrlConstant.URL.concat(serviceName),form,{observe: 'response'});
    }

    getproductStockDetails(serviceName : string) : Observable<ResponseObject>{
      return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName)); 
    } 

    getSparePartsByModel(modelId : number,serviceName : string) : Observable<ResponseObject>{
      return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),modelId); 
    }

    getStockDetailsById(id : number,serviceName : string) : Observable<ResponseObject>{
      return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),{"id":id}); 
    } 

    getBrandDetails(serviceName : string) : Observable<ResponseObject>{
      return this.http.get<ResponseObject>(UrlConstant.URL.concat(serviceName));
    }
   
    getAllModelsByBrand(brandId : number,serviceName : string) : Observable<ResponseObject>{
      return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),brandId);
    }
   
    getStockByBrandAndModel(brandId : number,modelId : number,serviceName : string) : Observable<ResponseObject>{
      return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),{brandId:brandId,modelId:modelId});
    }

    getStockByBrandModelAndSpareParts(brandId : number,modelId : number,sparePartId :number,serviceName : string) : Observable<ResponseObject>{
      return this.http.post<ResponseObject>(UrlConstant.URL.concat(serviceName),{brandId:brandId,modelId:modelId,sparePartId:sparePartId});
    }

    checkInvoiceByInvoiceNumber(invoiceNumber : string,serviceName : string) : Observable<any>{
      return this.http.post<any>(UrlConstant.URL.concat(serviceName),invoiceNumber);
    }
 
    getAllBrandDetails(serviceName :string){
      if(!this.allMobileBrands){
          this.getBrandDetails(serviceName).subscribe(responseObj => {
            this.responseObject = responseObj as ResponseObject;
            if(this.responseObject){
              this.allMobileBrands =  this.responseObject.brandDetailsList;
            }
          }, error => {
            console.log("error results :" , error);
          });
        }
    }

    searchModelsByBrand(selectedBrandId: number,serviceName: string){
        this.getAllModelsByBrand(selectedBrandId,serviceName).subscribe(responseObj =>
        {
          this.responseObject = responseObj;
          if(this.responseObject){
            this.allMobileModels = this.responseObject.productModelDetailsList;
          }
        }, error => {
          console.log("error results :" , error);
        });
    } 

    searchSparePartsByModel(modelId: number,serviceName: string ){
        this.getSparePartsByModel(modelId,serviceName).subscribe(responseObj => 
        {
          this.responseObject = responseObj as ResponseObject;
          if(this.responseObject){
            this.allMobileSpareParts = this.responseObject.productPartDetailsList;
          } 
        }, error => {
        console.log("error results :" , error);
      });
    } 
    
    // defaultStockDetails: any[] = [ 
    //   {id: 1, productQuality: 'Origional', retailBuy: 100,retailSell:"folder",wholeSaleBuy:"folder desc",deletionStatus :'N'},
    //   {id: 2, productQuality: 'Duplicate', retailBuy: 200,retailSell:"charger",wholeSaleBuy:"charger desc",deletionStatus :'N'},
    //   {id: 1, productQuality: 'Origiona;', retailBuy: 100,retailSell:"Screen grauds",wholeSaleBuy:"Screen desc",deletionStatus :'N'},
    // ];
   
    // defaultSpareDetails: any[] = [ 
    //   {id: 1, brandId: '26', modelId: "76",sparePartName:"folder",spareDiscription:"folder desc",deletionStatus :'N'},
    //   {id: 2, brandId: '27', modelId: "77",sparePartName:"charger",spareDiscription:"charger desc",deletionStatus :'N'},
    //   {id: 1, brandId: '28', modelId: "78",sparePartName:"Screen grauds",spareDiscription:"Screen desc",deletionStatus :'N'},
    // ];
  
  
    // defaultModelDetails: any[] = [ 
    //   {id: 1, brandId: '101', modelName: "SamSung S8",modelDiscription:"default desc1",deletionStatus :'N'},
    //   {id: 2, brandId: '102', modelName: "Nokia 7710",modelDiscription:"default desc2",deletionStatus :'N'},
    //   {id: 3, brandId: '103', modelName: "Vivo 6677",modelDiscription:"default desc3",deletionStatus :'N'}
    // ];
  
    // defaultBrand: any[] = [
    //   {id: 1, brandName: 'Samsung',brandDiscription: "default brand",deletionStatus :'N'},
    //   {id: 2, brandName: 'Nokia', brandDiscription: "default brand",deletionStatus :'N'},
    //   {id: 3, brandName: 'Apple', brandDiscription: "default brand",deletionStatus :'N'}
    // ];
 
    // allProductTypes : any[] = [
    //   {id: '200', name: 'Mobile'},
    //   {id: '201', name: 'Electronics'},
    //   {id: '202', name: 'Electric'}
    // ];
}

