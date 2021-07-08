import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from 'src/app/models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl : string = "https://localhost:44395/api/categories";
  constructor(private httpClient : HttpClient) { }

  public getCategories(){
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  public getCategoryById(id:number){
    let newUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Category>(newUrl);
  }

}
