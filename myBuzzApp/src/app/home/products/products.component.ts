import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { NativeDateAdapter, DateAdapter,MAT_DATE_FORMATS } from '@angular/material';


export interface productType {
  id: string;
  name: string;
}

export interface MobileBrand {
  id: string;
  brandName: string;
}


export interface MobileModel {
  id: string;
  modelName: string;
}

export interface SparePart {
  id: string;
  sparePartName: string;
}

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dob : String;
  datePickerValue :string;
  basicDatepicker :string;
  startDate = new Date(2020, 2, 19);
  startDate1 = new Date() ;
  currentDate = Date ();
  dob11 = Date();
  
  minDate = new Date(2019, 0, 1);
  maxDate = new Date(2020,0,1); 

  constructor(private homeService : HomeService) { }

  ngOnInit() {
  // this.homeService.share.subscribe (x => this.text1 = x);
  }
  updateText(text){
   // this.homeService.updateDate(text);
  }

 convertStr() {
 alert("heloo");
    var date = new Date(this.datePickerValue),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
       let srt =[date.getFullYear(), mnth, day].join("-");
    alert(srt);
  }

}
//@Temporal(TemporalType.Date)