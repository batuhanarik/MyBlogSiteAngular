import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrls: ['./category-articles.component.css']
})
export class CategoryArticlesComponent implements OnInit {

  page:number=1;
  articles:Article[]=[];
  totalCount: number;
  pageSize:number=5;
  ajax;
  categoryId : number;

  constructor(private activatedRoute: ActivatedRoute,private articleService: ArticleService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {

      if(this.ajax!=null) this.ajax.unsubscribe();

      this.articleService.dataLoading = true;
      this.articles=[];
      this.totalCount=0;

      if(params.get("id")){
        this.categoryId = Number(params.get("id"));
      }
      if(params.get("page")){
        this.page = Number(params.get("page"));
      }


      this.ajax = this.getArticlesByCategoryId();

    });
  }

  getArticlesByCategoryId(){
    this.articleService.getArticlesByCategoryId(this.categoryId,this.page,this.pageSize).subscribe(data => {
      this.articles = data.articles;
      this.totalCount = data.totalCount;
    });
  }

}
