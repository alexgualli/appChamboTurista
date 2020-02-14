import { Component, OnInit } from '@angular/core';
import User from '../entity/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';
import { AlertServiceService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: User = new User();
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public userService: LoginService,
    private alertService:AlertServiceService
  ) {
    this.myForm = this.createMyForm();
  }

  createUser() {
    if (this.myForm.value.password === this.myForm.value.passwordConfirmation) {
      this.user.correo = this.myForm.value.emailAddress;
      this.user.nombre = this.myForm.value.firstName;
      this.user.apellido = this.myForm.value.lastName;
      this.user.password = this.myForm.value.password;
      this.user.rol=2;
      this.userService.createUser(this.user).subscribe((newUser:any)=> {
        console.log(this.user);
        this.user=newUser;
        console.log("NewUser ",this.user);
        this.alertService.presentToast('Registro Correcto','success');
        this.navCtrl.navigateForward(['/login']);
      }
      ,error=>{
        if(error.statusText == 'No Content'){
          this.alertService.presentToast('Registro Correcto','success');
          this.navCtrl.navigateForward(['/login']);
        }
        else{
          this.alertService.presentToast('Intentalo de Nuevo','danger');
    
        }
      })
      
    }
    else{
      this.alertService.presentToast('Las contraseñas no coinciden','danger');

    }
    
  }

  private createMyForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],

    });
  }

  /*
  
            <ion-item>
              <ion-icon name="calendar" item-start></ion-icon>
              <ion-label stacked>Fecha de nacimiento:</ion-label>
              <ion-datetime formControlName="dateBirth" displayFormat="MM-DD-YYYY" placeholder="MM-DD-YYY"></ion-datetime>
            </ion-item>
  */
  public ngOnInit() {
    
  }
}
