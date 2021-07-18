import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  page:number=1;
  articles:Article[];
  totalCount: number;
  pageSize:number=5;
  ajax;
  searchText:string;

  constructor(private articleService: ArticleService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.url.subscribe(params => {

      if(this.ajax!=null) this.ajax.unsubscribe();

      this.articles = [];
      this.totalCount = 0;
      this.articleService.dataLoading = true;

      if(this.activatedRoute.snapshot.paramMap.get("page")){
        this.page = Number(this.activatedRoute.snapshot.paramMap.get("page"));
      }
      this.searchText = this.activatedRoute.snapshot.queryParamMap.get("s");

      this.ajax = this.getSearchArticles();

    })
  }
  getSearchArticles(){
    this.articleService.getSearchArticles(this.searchText,this.page,this.pageSize).subscribe(data =>{
      this.articles = data.articles;
      this.totalCount = data.totalCount;
    });
  }
}

