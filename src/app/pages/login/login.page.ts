import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';

import { NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert/alert.service';
import User from '../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertService:AlertServiceService,private navCtrl: NavController,private userService:LoginService, private user:User) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.user.correo=form.value.email;
    this.user.password=form.value.password;
    this.userService.login({ email: this.user.correo, pass: this.user.password }).subscribe(
     (user:any) => {
       console.log('user: '+user);
       this.navCtrl.navigateForward(['/home']);
      },
      error => {
        
        if(error.status == 200){
          this.alertService.presentToast('Bienvenido','success');
          this.navCtrl.navigateForward(['/home']);          
        }
        else{
          this.alertService.presentToast('Email o Password Incorrecto','danger');
        }
      }
    );
  }

}
