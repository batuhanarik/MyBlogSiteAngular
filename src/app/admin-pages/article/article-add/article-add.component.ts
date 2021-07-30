import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { MyvalidationService } from 'src/app/services/myValidation/myvalidation.service';
import { Router } from '@angular/router';
import * as DeCoupleDocument from '@ckeditor/ckeditor5-build-decoupled-document';
@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
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

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService, public myValidationService: MyvalidationService,private router: Router) { }

  ngOnInit(): void {

    this.getCategory();

    this.articleForm = new FormGroup({

      title: new FormControl("Makale 1", Validators.required),
      contentSummary: new FormControl("Makale özet 1", Validators.required),
      contentMain: new FormControl("",Validators.required),
      category: new FormControl("", Validators.required),
      picture: new FormControl("")
    });
  }

  get getControls(){
    return this.articleForm.controls;
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.addArticle(this.articleForm.value).subscribe(result => {
        this.success = true;
        this.router.navigateByUrl("/admin/makale/liste");

      }, error => {
        this.success = false;
        this.info = "Bir hata oluştu : " + error.message;
      });
    }
  }

  displayCategoryName(category) {
    return category.name;
  }


  getCategory() {
    this.categoryService.getCategories().subscribe(result => {

      this.categories = result;
    });
  }

  upload(files) {
    this.fileData = files.target.files[0];

    let formData = new FormData();
    formData.append("picture", this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe(result => {
      console.log(result.path);
      this.picture = result.path;

      this.articleForm.controls.picture.setValue(this.picture);
    });
  }

}
