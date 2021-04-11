import { Component, OnInit, ViewChild } from '@angular/core';
import { MobilePartsService } from '../../shared/mobile-parts.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { ModifyMobilePartsComponent } from '../../modifyComponent/modify-mobile-parts/modify-mobile-parts.component';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';
import { ProductPartModel } from '../../../models/spareParts/ProductPartsModel';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-get-mobile-parts-details',
  templateUrl: './get-mobile-parts-details.component.html',
  styleUrls: ['./get-mobile-parts-details.component.scss']
})
export class GetMobilePartsDetailsComponent implements OnInit  {
  
  //displayedColumns: string [] = ['sparePartName','spareDiscription','actions'];
  displayedColumns: string [] = ['id','brandId','modelId','sparePartName','spareDiscription','actions'];
  hideLoadData : boolean = false;
  searchKey : string;   
  mobilePartDetails : ProductPartModel[] = [];
  selectedBrandId : number;
  selectedBrandName : string =""; 
  selectedModelId :number;
  selectedModelName : string =""; 
  brandOrModelChanged : boolean = false;
  index : number;
  dataSource = new MatTableDataSource<any>(this.mobilePartDetails);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static : true}) sort: MatSort;
 
  constructor( public  mobilePartsService : MobilePartsService,private dialog : MatDialog,public genericService : GenericService) {
    this.hideLoadData = true;
    //this.genericService.getMobileBrands();
   } 
   ngAfterViewInit(){
   
    this.getMobileBrands(); 
    //alert(this.genericService.allMobileBrands); 
   }  
  ngOnInit() {
    
   
    //this.getproductPartDetails();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearOnsearch(){
    this.searchKey ="";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
 
  getproductPartDetails(){
    this.mobilePartsService.getMobiePartsDetails(UrlConstant.GET_SPARE_PARTS_DETAILS).subscribe(responseObj => {
      this.mobilePartsService.responseObject = responseObj as ResponseObject;
      if(this.mobilePartsService.responseObject){
         this.dataSource.data = this.mobilePartsService.responseObject.productPartDetailsList;
      }
      this.hideLoadData = true;
    }, error => {
      this.hideLoadData = true;
      console.log("error results :" , error);
    });
  } 
  
  searchPartsByBrandAndModel(){
      this.mobilePartsService.getAllpartsByBrandAndModel(this.selectedBrandId,this.selectedModelId,UrlConstant.GET_SPARE_PARTS_BYBRAND_AND_MODEL).subscribe(responseObj => 
      {
        this.mobilePartsService.responseObject = responseObj as ResponseObject;
        console.log("responseObj :"+JSON.stringify(this.mobilePartsService.responseObject.productPartDetailsList));
        if(this.mobilePartsService.responseObject){
          this.dataSource.data = this.mobilePartsService.responseObject.productPartDetailsList;
        }
        this.hideLoadData = true;
    },error => {
      this.hideLoadData = true;
      console.log("error results :" , error);
    });
  }
 
  getAllSparePartsByBrand(){
       this.mobilePartsService.getAllSparePartsByBrand(this.selectedBrandId,UrlConstant.GET_SPARE_PARTS_BY_BRAND_NAME).subscribe(responseObj => 
       {
          this.mobilePartsService.responseObject = responseObj as ResponseObject;
          if(this.mobilePartsService.responseObject){
            this.dataSource.data = this.mobilePartsService.responseObject.productPartDetailsList;
          }
          this.hideLoadData = true;
    }, error => {
        this.hideLoadData = true;
        console.log("error results :" , error);
    });
  }

  getMobileBrands(){ 
    if(!this.genericService.isValidCollection(this.genericService.allMobileBrands))
    {
      this.mobilePartsService.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => 
      {
        this.mobilePartsService.responseObject = responseObj as ResponseObject;
        if(this.mobilePartsService.responseObject){
          this.mobilePartsService.allMobileBrands = this.mobilePartsService.responseObject.brandDetailsList;
        }
        
        console.log("responseObj :" , responseObj);
      },error => { 
      });
    } 
  }
 
  searchModelsByBrandOnChange(){
    this.setRequiredValues();
    this.getAllModelsByBrand();
   }

    setRequiredValues(){
      this.brandOrModelChanged = true; 
    }
   
    searchByBrandOrModel(){
      if(this.brandOrModelChanged && this.selectedBrandId && this.selectedModelId){
        this.brandOrModelChanged = false;
        this.searchPartsByBrandAndModel(); 
      }else if(this.brandOrModelChanged && this.selectedBrandId){ 
        this.brandOrModelChanged = false;
        this.getAllSparePartsByBrand();
      }
  }

  getAllModelsByBrand(){
    this.selectedModelId = null; 
    this.mobilePartsService.getAllModelsByBrand(this.selectedBrandId,UrlConstant.GET_MODELS_BY_BRAND_NAME).subscribe(responseObj => {
      this.mobilePartsService.responseObject = responseObj as ResponseObject;
      if(this.mobilePartsService.responseObject){
        this.mobilePartsService.allMobileModels  = this.mobilePartsService.responseObject.productModelDetailsList;
      }
      
    }, error => {
      console.log("error results :" , error);
    });
  }

  onCreate(){ 
    this.mobilePartsService.addDialogCalled = true;
    this.mobilePartsService.initilizeFromGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="45%";
    this.dialog.open(ModifyMobilePartsComponent,dialogConfig);
  }

  onEdit(row){  
  
    // if(this.mobilePartsService.allMobileBrands){
    //   let rowDetails: any = this.mobilePartsService.allMobileBrands.find(s => s.id == row.brandId);
    //   if(rowDetails){
    //     // used to get selets label in service variable to be accessed in dialog form
    //     this.mobilePartsService.sharedBrandName = rowDetails.brandName;
    //   }
    // }

    // if(this.mobilePartsService.allMobileModels){
    //   let rowDetails: any = this.mobilePartsService.allMobileModels.find(s => s.id == row.modelId);
    //   if(rowDetails){
    //     // used to get selets label in service variable to be accessed in dialog form
    //     this.mobilePartsService.sharedModelName = rowDetails.modelName;
    //   }
    // }  
    this.mobilePartsService.updatedTableRow = null;  
    let id = row.id;
    this.mobilePartsService.addDialogCalled = false;
    this.mobilePartsService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="45%";
    const dialogRef = this.dialog.open(ModifyMobilePartsComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1 ){  
        const foundIndex = this.dataSource.data.findIndex(x => x.id === id);
        this.index = foundIndex;
        if(this.mobilePartsService.updatedTableRow){   
          //this.dataSource._updateChangeSubscription();
          this.dataSource.data[foundIndex] = this.mobilePartsService.updatedTableRow;  //this.mobilePartsService.getUpdatedDialogData();//
           //this.dataSource. 
           //this.dataSource._updateChangeSubscription();
           
           this.dataSource._renderChangesSubscription;
           this.refreshTable();
        }
      }     
    });
  }
 
  private refreshTable() {
    this.dataSource.paginator = this.paginator;
  }
//   private refreshTable() {
//     // Refreshing table using paginator
//     // Thanks yeager-j for tips 
//     // https://github.com/marinantonio/angular-mat-table-crud/issues/12
//     this.paginator._changePageSize(this.paginator.pageSize);
//   }

//   private refreshTable() {
//     // If there's no data in filter we do update using pagination, next page or previous page
//     if (this.dataSource.getValue() === '') {
//       if (this.dataSource._paginator.pageIndex === 0) {
//         this.dataSource._paginator.nextPage();
//         this.dataSource._paginator.previousPage();
//       } else {
//         this.dataSource._paginator.previousPage();
//         this.dataSource._paginator.nextPage();
//       }
//       // If there's something in filter, we reset it to 0 and then put back old value
//     } else {
//       this.dataSource.filter = '';
//       this.dataSource.filter = this.filter.nativeElement.value;
//     }
// }
    
}
 