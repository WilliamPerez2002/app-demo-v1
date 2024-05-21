import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  firebase = inject(FirebaseService)

  utils = inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }

  async submit() {

    const loading = await this.utils.loading();;

    loading.present();

    this.firebase.signIn(this.form.value as User).then(res => {

      console.log(res.user);

      const user = {
        uid: res.user.uid,
        email: res.user.email,
      }

      console.log(user);


      this.utils.saveInLocalStorage('user', user);

      this.utils.routerLink('/main/home');

    }).catch(err => {
      this.utils.showToast({
        message: err.message,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline',
        duration: 10000
      })


    }).finally(() => {
      loading.dismiss();
    });;



  }
}
