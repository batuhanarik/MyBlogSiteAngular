import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { Category } from 'src/app/models/category/category';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article : Article;
  category : Category;



  constructor(public articleService: ArticleService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.articleService.dataLoading = true;
      let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      this.articleService.getArticle(id).subscribe(data => {
        this.article = data;
        this.category = data.category;

      this.articleService.articleViewCountUp(this.article.id).subscribe();
      });


    })
  };


}
