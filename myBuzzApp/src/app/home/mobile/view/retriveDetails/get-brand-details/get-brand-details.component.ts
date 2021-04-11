import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort,MatDialog, MatDialogConfig } from '@angular/material';
import { MobileService } from '../../../services/mobile.service';
import { SharedmobileService } from '../../shared/sharedmobile.service';
import { ModifybrandComponent } from '../../modifyComponent/modifybrand/modifybrand.component';
import { UrlConstant } from 'src/app/requestStucture/UrlConstant';
import { ResponseObject } from 'src/app/requestStucture/ResponseObject';

@Component({
  selector: 'app-get-brand-details',
  templateUrl: './get-brand-details.component.html',
  styleUrls: ['./get-brand-details.component.scss']
})

export class GetBrandDetailsComponent implements OnInit {
  searchKey : string; 
  displayedColumns: string[] = ['id','brandName', 'brandDiscription','actions'];
  searchWithInColumns: string[] = ['brandName', 'brandDiscription'];
  hideLoadData : boolean = false;
  allMobileBrands : any[] = [];

  id : any;
  dsId : any;
  dataSource = new MatTableDataSource<any>(this.allMobileBrands);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static : true}) sort: MatSort;

  constructor( private mobileSrv : MobileService,
               private dialog : MatDialog,
               private sharedMobileSrv : SharedmobileService
               ) {
   
   //this.dataSource.data = ELEMENT_DATA; 
  }

  ngOnInit() {
    this.getMobileBrands(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dateSourceSearch();
    // this.dataSource.filterPredicate = (data,filter) =>{
    //   return this.searchWithInColumns.some(ele =>{
    //     return data[ele].toLowerCase().indexOf(filter) !=-1;
    //   });
    // };
  }

  dateSourceSearch(){
    this.dataSource.filterPredicate = (data,filter) =>{
      return this.searchWithInColumns.some(ele =>{
        return data[ele].toLowerCase().indexOf(filter) !=-1;
      });
    };
  }

  getMobileBrands(){ 
        this.sharedMobileSrv.getBrandDetails(UrlConstant.GET_BRAND_DETAILS).subscribe(responseObj => 
        {
          this.sharedMobileSrv.responseObject = responseObj as ResponseObject;
          this.dataSource.data = this.sharedMobileSrv.responseObject.brandDetailsList;
          this.hideLoadData = true;
          console.log("responseObj :" , responseObj);
      },error => { 
        //this.errorMsg = error.status;
        //Unknown Error
        console.log("error.statusText:" , error.statusText);
        console.log("error results  sadasd:" , error);
        if("Unknown Error"=== error.statusText){
         // this.allMobileBrands= this.defaultBrands;
        }
     });
  
     // defaultBrands
    }

  clearOnsearch(){
     this.searchKey ="";
     this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.sharedMobileSrv.initilizeFromGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="40%";
    const dialogRef = this.dialog.open(ModifybrandComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        if(result === 1){
         // this.dataSource.data.push(this.sharedMobileSrv.updatedTableRow);
         // this.refreshTable(); 
        }
    });
  }

  onEdit(brandRow) { 
    // this.id = brandRow.id;
    let id = brandRow.id;
     console.log("error:brandRow:" , brandRow); 
     //alert(brandRow ||JSON);
    let updatedBrndRow : any = { id: 1, brandName: "Hydrogen updated",
                    brandDiscription: "default brand updated",
                    deletionStatus: "N" };
    
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true;
    dialogConfig.width ="40%";
    this.sharedMobileSrv.populateForm(brandRow);  
    const dialogRef = this.dialog.open(ModifybrandComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
  
      if(result === 1 ){  
        const foundIndex = this.dataSource.data.findIndex(x => (x.id === id)); 
        //this.dataSource.data[foundIndex] =  this.sharedMobileSrv.updatedTableRow;
       // this.dataSource._updateChangeSubscription();
        //this.dataSource._renderChangesSubscription;  
       // this.refreshTable();
      }    
    });
  }
  private refreshTable() {
  // this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}