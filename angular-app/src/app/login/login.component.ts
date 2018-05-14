import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: '';
  error: any;

  email: string;
  password: string;

  constructor(public auth: AuthService, private router: Router, private location: Location) {}

  onSubmit(formData) {
    if (formData.valid) {
      this.auth.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
          this.location.back();
        }).catch( (err) => {
            this.error = err;
          });
  }
}

ngOnInit(): void {
  this.auth.afAuth.authState.subscribe(auth => {
    if (auth) {
      this.location.back();
      if (document.referrer === 'http://localhost:4200/home' || document.referrer === 'https://www.inn-credible.com/home') {
        window.location.reload();
      }
    } else {
      document.getElementById('back').style.visibility = 'visible';
    }
  });
}


googlSignIn() {

    // Create a Google Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    // Sign In With the given provider (Google in this case)
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken; // Not used
      const user = result.user; // Not used

      const names = user.displayName; // Not used

      const splitname = names.split(' '); // Not used
      const uid = user.uid;

      const ref = firebase.database().ref ('/users/');
      const dbUser = {};
      ref.once('value').then(function (snapshot) {
        if (!snapshot.hasChild(uid)) {
          dbUser[uid + '/email'] = user.email;
          dbUser[uid + '/firstname'] = splitname[0];

          if (splitname.length > 1) {
            dbUser[uid + '/lastname'] = splitname[1];
          }

          dbUser[uid + '/rewardPoints'] = 0;
          ref.update(dbUser);
        }

      });
    }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode);
      }

    );
  }

}
