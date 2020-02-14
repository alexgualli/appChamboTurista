import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/service/place/place.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  places: any[];
  placesFilter: any[];
  cat: any;
  category: any[];
  public id: number;
  constructor(private route: Router, private nav: NavParams, private categoryService: CategoryService, private placeService: PlaceService, private activatedRoute: ActivatedRoute) {
    this.cat = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("CAT: ", this.cat);
  }

  doRefresh(refresher) {
    this.getAllPlaces(refresher);
    setTimeout(() => {
      refresher.target.complete();
    }, 1000);

  }

  ngOnInit() {
    this.places = [];
    this.category = [];
    //this.nav.get('id');
    this.cat = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Llega Places ", this.cat);
    localStorage.setItem('categoryId', this.cat);
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllPlaces();
    this.getCategory(this.id);
  }

  getCategory(id) {
    this.categoryService.getById(this.id).subscribe((res: any) => {
      this.category = res;
      console.log(this.category);
    })
  }

  getAllPlaces(refresher?) {

    if (parseInt(this.activatedRoute.snapshot.paramMap.get('id')) > 0) {
      this.placeService.getAllPlaces()
        .subscribe((res: any) => {
          this.places = res.filter(e => e.categoria.id === this.id);
        });
    }

    /**/
    if (refresher) {
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.target.complete();
      }, 2000);
    }
  }

}
