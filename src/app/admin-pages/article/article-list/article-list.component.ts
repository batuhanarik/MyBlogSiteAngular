import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  displayedColumns : string[] = ["picture","title","category","commentCount","publishDate","viewCount"];
  dataSource;
  articles: Article[];

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesWithoutPg().subscribe(data => {

      // this.articles = data;
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
