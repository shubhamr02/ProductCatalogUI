import { Injectable } from '@angular/core';
import {ProductDTO} from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class ProductService{

    constructor(private http:HttpClient) {}

    getAllProducts(url : string){
        return this.http.get(url);
    }

    addProductToCatalog(data : any) : Observable<any>{
        let apiURL = 'http://localhost:8888/api/add'
        console.log('data from form ',JSON.stringify(data))
        return this.http.post(apiURL,data,{responseType: 'text'})
    }
}



