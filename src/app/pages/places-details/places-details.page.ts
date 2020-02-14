import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/service/place/place.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.page.html',
  styleUrls: ['./places-details.page.scss'],
})
export class PlacesDetailsPage implements OnInit {

  public place: any;
  public category: any;
  id: string;
  list: any;
  constructor(public loadingController: LoadingController, private activatedRoute: ActivatedRoute, private servicePlace: PlaceService) {
    this.place = {};
    if (this.list) this.list = JSON.parse(this.list);
      else this.list = [];
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (parseInt(this.activatedRoute.snapshot.paramMap.get('id')) > 0) {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      console.log(id);
      this.servicePlace.getById(id).subscribe((res: any) => {
        console.log("latitud ", res.latitud);
        console.log("longitud ", res.longitud);
        this.category = res.categoria.nombre;
        this.place = res;
      })
    }
    this.maps();
  }

url:string;

  async maps(event?) {
    let loading = await this.loadingController.create({ duration: 15000 });
    navigator.geolocation.getCurrentPosition(pos => {
      this.url = "https://maps.google.com/maps?&z=15&t=k&q=" + this.place.latitud + " " + this.place.longitud;      
  })
}

}
