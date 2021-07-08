import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {

  categories : Category[] = [];
  constructor(private categoryService: CategoryService) {

   }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

}
