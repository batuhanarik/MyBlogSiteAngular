import { Component, OnInit } from '@angular/core';
import { Archive } from 'src/app/models/article/archive';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-menu-archive',
  templateUrl: './menu-archive.component.html',
  styleUrls: ['./menu-archive.component.css']
})
export class MenuArchiveComponent implements OnInit {

  archives:Archive[]= [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticlesByArchive();

  }

  getArticlesByArchive(){
    return this.articleService.getArticlesByArchive().subscribe(data=>{
      this.archives = data;
    });
  }

}
