import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() totalCount:number;
  @Input() articles : Article[];
  @Input() page : number;
  @Input() pageSize : number;
  @Input() typeList : string;
  defaultArticle : string = "assets/images/articleEmpty.PNG";
  constructor(private articleService: ArticleService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.articleService.dataLoading = true;
  }

  pageChanged(event){
    this.articleService.dataLoading = true;
    this.page = event;
    switch(this.typeList){
      case "home":
        this.router.navigateByUrl(`/sayfa/${this.page}`);
        break;

      case "category":
        let categoryName = this.activatedRoute.snapshot.paramMap.get("name");
        let categoryId = this.activatedRoute.snapshot.paramMap.get("id");
        this.router.navigateByUrl(`/kategori/${categoryName}/${categoryId}/sayfa/${this.page}`);
        break;
      case "search":
        let searchText = this.activatedRoute.snapshot.queryParamMap.get("s");
        this.router.navigateByUrl(`/arama/sayfa/${this.page}?s=${searchText}`);
        break;

        case "archive":
          let year = this.activatedRoute.snapshot.paramMap.get("year");
          let month = this.activatedRoute.snapshot.paramMap.get("month");

          this.router.navigateByUrl(`/arsiv/${year}/${month}/sayfa/${this.page}`);
          break;

      default:
        break;
    }
    this.router.navigateByUrl(`/sayfa/${this.page}`);
  }

}
