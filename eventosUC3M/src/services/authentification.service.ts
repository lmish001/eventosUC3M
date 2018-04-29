import { Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import {User} from '../models/user.model';
//import AuthProvider = firebase.auth.AuthProvider;



@Injectable()

export class AuthentificationService {

    private userRef = this.db.list<User>('Users')
    user: firebase.User;
    logged_in: boolean;
    constructor(private auth: AngularFireAuth, private db: AngularFireDatabase){
        this.logged_in=false;
    }

    async login(credentials) {
        console.log('Sign in with email');
        const result = this.auth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
        if (result) {
            this.user = firebase.auth().currentUser;
            this.logged_in==true;
            return result;
        }
        
    }

    getCurrentUser() {
       return this.db.list('/Users', ref => ref.orderByChild('email').equalTo(this.user.email));       
    }

    updateUser(value: User){
        return this.userRef.update(value.key, value);
    }




}