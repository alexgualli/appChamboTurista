import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlacePageRoutingModule } from './new-place-routing.module';

import { NewPlacePage } from './new-place.page';



import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewPlacePageRoutingModule
  ],
  declarations: [NewPlacePage]
})
export class NewPlacePageModule {}
