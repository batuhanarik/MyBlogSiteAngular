import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  page:number=1;
  articles:Article[];
  totalCount: number;
  pageSize:number=5;
  ajax;


  constructor(private articleService: ArticleService,private router:Router,private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    if(this.ajax!=null) {
      this.ajax.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get("page")){
        this.page = Number(params.get("page"));
      }
      this.articles=[];
      this.totalCount = 0;

      this.ajax = this.articleService.getArticles(this.page,this.pageSize).subscribe(data => {
        this.articles = data.articles;
        this.totalCount = data.totalCount;
      });
    });
  }


}
