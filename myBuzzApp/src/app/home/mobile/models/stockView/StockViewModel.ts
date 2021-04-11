export class StockViewModel {
     
    id : number;
    brandId: number;
    brandName ? :string;
    brandDesc ? : string;
    modelId: number;
    modelName ? :string;
    modelDesc ? : string;
    sparePartId : number;
    sparePartName ? :string;
    sparePartDesc ?: string;
    productQuality ?: string;
    retailBuy : number;
    retailSell : number;
    wholeSaleBuy : number;
    wholeSaleSell :number;
    quantity : number;
    soldQuantity : number;
    invoiceId ? : number;
    invoiceNumber :string;
    productRefrence : string;
    productType ?: string;
    createdDate : Date; 
    constructor(){  
    }  
}  