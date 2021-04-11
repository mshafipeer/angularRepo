import { BrandModel } from '../brand/BrandModel';

export class ProductModel {
    id: number; 
    brandId: number;
    modelName : string;
    modelDiscription : string;
    deletionStatus  : string;
    productBrand ? : BrandModel = new BrandModel ();
    constructor(){ 
    }
}