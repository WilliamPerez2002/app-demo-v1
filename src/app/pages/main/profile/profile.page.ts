import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebase = inject(FirebaseService)

  utils = inject(UtilsService);

  username: string;
  email: string;


  constructor() { }

  async ngOnInit() {

    let uid = this.utils.getFromLocalStorage('user').uid;

    try {
      const userData = await this.firebase.getUserData(uid);
      console.log(userData);

      this.username = userData.name;
      this.email = userData.email;

      this.utils.saveInLocalStorage('user', userData);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }




}
