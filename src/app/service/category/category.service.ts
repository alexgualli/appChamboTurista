import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ServiceService {

  constructor(private http: HttpClient) {
    super('/category');
   }

   getAllCategories() {
    const path = this.url;  
    console.log(path);
    return this.http.get(path);
  }
  
  getById(id: number) {
    const path = this.url+'/'+id;
    console.log(path);  
    return this.http.get(path);
  }

  createCategory(category){
    return this.http.post(this.url,category);
  }
}
