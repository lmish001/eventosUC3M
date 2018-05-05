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
    constructor(public auth: AngularFireAuth, private db: AngularFireDatabase){
        auth.authState.subscribe(user => {
			this.user = user;
		});
    }

    async login(credentials) {
        console.log('Sign in with email');
        return this.auth.auth.signInWithEmailAndPassword(credentials.email,
            credentials.password);
        
    }

    logout () {
    return this.auth.auth.signOut();
    }

    getCurrentUser() {
        this.user = firebase.auth().currentUser;
       return this.db.list('/Users', ref => ref.orderByChild('email').equalTo(this.user.email));       
    }

    updateUser(value: User){
        return this.userRef.update(value.key, value);
    }




}