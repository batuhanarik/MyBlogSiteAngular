import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticlePg } from 'src/app/models/article/article-pg';
import { tap } from 'rxjs/operators';
import { Article } from 'src/app/models/article/article';
import { Archive } from 'src/app/models/article/archive';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public dataLoading: boolean = true;
  private apiUrl: string = "https://localhost:44395/api/articles";

  constructor(private httpClient: HttpClient) { }

  getArticlesWithoutPg() {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  getArticles(page: number, pageSize: number) {
    let api = `${this.apiUrl}/${page}/${pageSize}`;

    return this.httpClient.get<ArticlePg>(api).pipe(tap(x => {
      this.dataLoading = false;
    }));
  }

  getArticle(id: number) {
    let api = `${this.apiUrl}/${id}`;

    return this.httpClient.get<Article>(api).pipe(tap(x => {
      this.dataLoading = false;
    }));
  }

  getArticlesByCategoryId(categoryId: number, page: number, pageSize: number) {
    let api = `${this.apiUrl}/getArticlesByCategoryId/${categoryId}/${page}/${pageSize}`;

    return this.httpClient.get<ArticlePg>(api).pipe(tap(x => {
      this.dataLoading = false;
    })
    );
  }

  getSearchArticles(searchText: string, page: number, pageSize: number) {
    let api = `${this.apiUrl}/SearchArticles/${searchText}/${page}/${pageSize}`;

    return this.httpClient.get<ArticlePg>(api).pipe(tap(x => {
      this.dataLoading = false;
    })
    );
  }

  getArticlesByMostView() {
    let api = `${this.apiUrl}/GetArticlesByMostView`;

    return this.httpClient.get<Article[]>(api);
  }

  getArticlesByArchive() {
    let api = `${this.apiUrl}/GetArticlesByArchive`;

    return this.httpClient.get<Archive[]>(api);

  }

  getArticleArchiveList(year: number, month: number, page: number, pageSize: number) {

    let api = `${this.apiUrl}/GetArticleArchiveList/${year}/${month}/${page}/${pageSize}`;


    return this.httpClient.get<ArticlePg>(api).pipe(tap(x => {
      this.dataLoading = false;
    })
    );

  }

  articleViewCountUp(id: number) {

    let api = `${this.apiUrl}/ArticleViewCountUp/${id}`;
    return this.httpClient.get(api);
  }

  saveArticlePicture(image) {
    return this.httpClient.post<any>(`${this.apiUrl}/SaveArticlePicture`, image);
  }

  addArticle(article:Article) {
    return this.httpClient.post<any>(this.apiUrl,article);
  }

  updateArticle(id: number, article:Article){
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`,article);
  }
  deleteArticle(id: number){
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

}
