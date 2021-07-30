import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MyvalidationService } from 'src/app/services/myValidation/myvalidation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';

import * as DeCoupleDocument from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  public Editor = DeCoupleDocument;
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  fileData: File = null;
  picture: string = null;
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];
  articleId : number;
  contentLoading: boolean = true;


  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
     public myValidationService: MyvalidationService,
     private activatedRoute : ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.getCategory();
    this.articleId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.articleService.getArticle(this.articleId).subscribe(data=> {
      this.picture = data.picture;

      this.getControls.title.setValue(data.title);
      this.getControls.contentSummary.setValue(data.contentSummary);
      this.getControls.contentMain.setValue(data.contentMain);
      this.getControls.category.setValue(data.category);
      // this.getControls.picture.setValue(data.picture);

      this.contentLoading=false;

    });


    this.articleForm = new FormGroup({

      title: new FormControl("", Validators.required),
      contentSummary: new FormControl("", Validators.required),
      contentMain: new FormControl("",Validators.required),
      category: new FormControl("", Validators.required),
      picture: new FormControl("")
    });




  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.updateArticle(this.articleId,this.articleForm.value).subscribe(result => {
        this.success = true;
        this.router.navigateByUrl("/admin/makale/liste");

      }, error => {
        this.success = false;
        this.info = "Bir hata oluştu : " + error.message;
      });
    }
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  displayCategoryName(category) {
    return category.name;
  }

  get getControls(){
    return this.articleForm.controls;
  }

  upload(files) {
    this.fileData = files.target.files[0];

    let formData = new FormData();
    formData.append("picture", this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe(result => {
      this.picture = result.path;

      this.articleForm.controls.picture.setValue(this.picture);
    });
  }
}
