import { Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user.model';
import { HomePage } from '../home'
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;



@Injectable()

export class AuthentificationService {
    private user: firebase.User;
    constructor(private auth: AngularFireAuth){
        auth.authState.subscribe(user => {
			this.user = user;
		});
    }


   async login(credentials) {
    console.log('Sign in with email');
    return this.auth.auth.signInWithEmailAndPassword(credentials.email,
         credentials.password);
}

/*login() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}

private oauthSignIn(provider: AuthProvider) {
if (!(<any>window).cordova) {
    return this.auth.auth.signInWithPopup(provider);
} else {
    return this.auth.auth.signInWithRedirect(provider)
    .then(() => {
        return this.auth.auth.getRedirectResult().then( result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
        }).catch(function(error) {
            // Handle Errors here.
            alert(error.message);
        });
    });
}
}*/

}