import { StockViewModel } from '../mobile/models/stockView/StockViewModel';

export class DailySalesModel {
    id: number; 
    productId : number;
    serialNumber ? : number;
    productDesc : string;
    productRefrence : string;
    customerId : number;
    unitPrice : number;
    quantity : number;
    discount : number;
    total : number
    createdUserId : string;
    createdDate : Date;
    notes : string;
    deletionStatus  : string;
    constructor(){  
    }
}