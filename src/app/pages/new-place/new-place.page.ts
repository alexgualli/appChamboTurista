import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { NavParams, LoadingController, NavController } from '@ionic/angular';
import { PlacesPage } from '../places/places.page';
import Place from '../entity/place';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PlaceService } from 'src/app/service/place/place.service';
import { AlertServiceService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
})
export class NewPlacePage implements OnInit {

  insert: boolean = false;
  nombre: string;
  descripcion: string;
  place: Place = new Place();
  id: any;
  list: any;
  text: string;
  category: any;
  constructor(private alertService:AlertServiceService,private navCtrl:NavController,private placeService: PlaceService, public loadingController: LoadingController, private camera: Camera, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private pl: PlacesPage, private nav: NavParams, private categoryService: CategoryService) {
    this.category = [];
    this.createMyForm();
    //this.place.id=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.id = localStorage.getItem('categoryId')
    console.log("Llego..... ", this.id);
    this.getCategoryId();
  }

  getCategoryId() {
    console.log("LLEGA");
    this.categoryService.getById(parseInt(localStorage.getItem('categoryId'))).subscribe((res: any) => {
      this.category = res
      this.place.categoria.id = this.category.id;
      this.place.categoria.nombre = this.category.nombre;
      console.log("HOLA", this.category);
    })
  }

  private createMyForm() {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  async addPoint(event?) {
    let loading = await this.loadingController.create({ duration: 15000 });
    loading.present();
    navigator.geolocation.getCurrentPosition(pos => {
      this.place.latitud = pos.coords.latitude;
      this.place.longitud = pos.coords.longitude;
      this.insert = true;
      console.log("COORDENADAS: ", this.place);
      if (event) {
        let reader = new FileReader();
        reader.onload = (data: any) => {
          this.list.unshift({ name: this.text, img: data.target.result });
          this.save();
          console.log("EVENTO");
          loading.dismiss();
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        loading.dismiss();
        console.log("sin EVENTO");
        const options: CameraOptions = { targetWidth: 100, destinationType: this.camera.DestinationType.DATA_URL };
        this.camera.getPicture(options).then(data => {
          this.list.unshift({ name: this.text, img: "data:image/jpeg;base64," + data });
          this.save();
        });
      }
    });
  }
  save() {
    localStorage.setItem('places-list', JSON.stringify(this.list));
    this.text = "";
  }

  addPlace() {
    this.place.categoria.id = this.category.id;
    this.place.categoria.nombre = this.category.nombre;
    this.place.nombre = this.nombre;
    this.place.descripcion = this.descripcion;
    this.placeService.createPlace(this.place).subscribe((res: any) => {
      this.alertService.presentToast("Lugar añadido correctamente", 'success');
      this.navCtrl.navigateForward(['/places/',this.id]);
    })
  }

}
