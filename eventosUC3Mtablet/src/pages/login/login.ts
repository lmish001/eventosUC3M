import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, Events } from 'ionic-angular';
import { AuthentificationService } from '../../services/authentification.service';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  
  loginForm: FormGroup;
  loginError: string;
  

  constructor(public navCtrl: NavController, private authService: AuthentificationService, formB: FormBuilder, public events: Events) {
    this.loginForm = formB.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login () {
    let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
    };
    this.authService.login(credentials).then(
      () =>  this.navCtrl.setRoot(HomePage),
     // () => console.log('logged in'),
				error => this.loginError = error.message
    )
}

}
