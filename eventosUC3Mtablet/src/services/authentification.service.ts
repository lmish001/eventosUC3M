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

    addUser() {
    /* let user = {
        name: "Lisa",
        lastName: "Simpson",
        lastName2: ' ',
        email: 'test2@gmail.com',
        campus: "Leganés",
        categories: ['Historia', 'Informática', 'Deporte'],
        avatar: 'http://3.bp.blogspot.com/_339JZmAslb0/TG3x4LbfGeI/AAAAAAAAABU/QATFhgxPMvA/s200/Lisa_Simpson150.jpg',
        ntf_evCanc: true,
        ntf_evMod: true,
        ntf_evNew: false

     }
        this.userRef.push (user);*/
    }




}