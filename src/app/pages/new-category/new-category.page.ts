import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import Category from '../entity/category';
import { AlertServiceService } from 'src/app/service/alert/alert.service';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})
export class NewCategoryPage implements OnInit {

  msg:string;
  category:Category= new Category();
  myForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,private alertService:AlertServiceService, private navCtrl:NavController,private categoryService:CategoryService ) { 
      this.myForm = this.createMyForm();
    }

  ngOnInit() {
  }
  addCategory(){
    this.category.nombre=this.myForm.value.name;
    console.log(this.category.nombre);
    this.categoryService.createCategory(this.category).subscribe((res:any)=>{
      this.msg;
      this.alertService.presentToast("Categoria añadida correctamente",'success');
        this.navCtrl.navigateForward(['/home']);
    })
  }

  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  


}
