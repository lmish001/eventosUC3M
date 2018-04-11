import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { User } from '../models/user.model';
import { HomePage } from '../home';

@Injectable()

export class AuthenticationService {

    constructor(private auth: AngularFireAuth, public navCtrl: NavController){
    }

    async login(user: User) {
    try{  
        const result = this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
        if(result) {
            this.navCtrl.setRoot(HomePage);
        }        
    }
    catch(e) {
        console.error(e);
    }
    }
}

