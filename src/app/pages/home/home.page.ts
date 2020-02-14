import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories: any[];
  categoriesFilter: any[];

  admin: boolean = false;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = [];
    this.getAllCategories();
  }

  doRefresh(refresher) {
    this.getAllCategories(refresher);
    setTimeout(() => {
      refresher.target.complete();
    }, 1000);

  }
  searchTerm: any = "";
  setFilteredItems() {

    this.categories = this.filterItems(this.searchTerm);

  }
  filterItems(searchTerm) {
    this.categories = this.categoriesFilter;
    if (searchTerm == '') {
      this.getAllCategories();
    }
    else {
      return this.categories.filter((item) => {
        return item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }


  getAllCategories(refresher?) {
    this.categoryService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res
        this.categoriesFilter = res
        console.log(" OBTENIDO ", this.categories);
      })
    if (refresher) {
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.target.complete();
      }, 2000);
    }
  }

}
