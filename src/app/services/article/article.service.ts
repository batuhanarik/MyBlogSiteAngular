import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticlePg } from 'src/app/models/article/article-pg';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public dataLoading : boolean = true;
  private apiUrl : string = "https://localhost:44395/api/articles";

  constructor(private httpClient: HttpClient) {}

  getArticles(page : number, pageSize: number){
    let api=`${this.apiUrl}/${page}/${pageSize}`;


    //veriler gelme işlemi bitti mi bitmedi mi kontrol amaçlı.
    return this.httpClient.get<ArticlePg>(api).pipe(tap(x=>{
      this.dataLoading = false;
    }));
  }


}
