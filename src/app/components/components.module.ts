import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'

import { MenuCategoryComponent } from './menu-category/menu-category/menu-category.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ArticleComponent } from './article/article.component';
import { UrlformatPipe } from '../pipes/urlformat.pipe';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';
import { MenuArchiveComponent } from './menu-archive/menu-archive.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MaterialModule } from '../modules/material/material.module';
import { ListCommentsComponent } from './list-comments/list-comments.component';
import { FooterNavComponent } from './nav/footer-nav/footer-nav.component';


@NgModule({
  declarations: [MenuCategoryComponent, PageTitleComponent, ArticleComponent,UrlformatPipe, MenuArticleMostViewComponent, MenuArchiveComponent, AddCommentComponent, ListCommentsComponent, FooterNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    MaterialModule
  ],
  exports: [
    MenuCategoryComponent,
    PageTitleComponent,
    ArticleComponent,
    UrlformatPipe,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    AddCommentComponent,
    ListCommentsComponent,
    FooterNavComponent
  ]
})
export class ComponentsModule { }
