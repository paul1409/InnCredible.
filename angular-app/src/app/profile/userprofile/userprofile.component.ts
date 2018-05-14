import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  newName: false;
  newPassword: false;
  newEmail: false;
  changePic: false;

  loading: false;

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
  }

  async uploadPic(event: any) {
    this.loading = true;
    this.changePic = true;

    // Get image file
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const storageRef = firebase.storage().ref();

    await storageRef.child('photos/' + this.userProfileService.afAuth.auth.currentUser.uid).put(file, metaData);

    const currentUser = this.userProfileService.afAuth.auth.currentUser;
    let picUrl;

    // Update firebase with new picture
    await storageRef.child('photos/' + this.userProfileService.afAuth.auth.currentUser.uid).getDownloadURL().then(async function (url) {
      picUrl = url;
      // Update image url on the database
      const ref = firebase.database().ref();
      const user = {};
      user['/users/' + currentUser.uid + '/photoURL'] = picUrl;

      // Update photoURL
      await currentUser.updateProfile({
        displayName: currentUser.displayName,
        photoURL: picUrl
      });
    });

    this.loading = false;
    this.changePic = false;
  }

}
