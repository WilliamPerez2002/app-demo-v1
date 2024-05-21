import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  firebase = inject(FirebaseService)

  utils = inject(UtilsService);


  constructor() { }

  ngOnInit() {
  }


  async submit() {

    const loading = await this.utils.loading();;

    loading.present();

    this.firebase.resetPassword(this.form.value.email).then(res => {
      this.utils.showToast({
        message: 'Se ha enviado un correo para restablecer la contraseña',
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
        duration: 3000
      })

      this.utils.routerLink('/auth');

    }).catch(err => {
      this.utils.showToast({
        message: err.message,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline',
        duration: 3000
      })



    }).finally(() => {
      loading.dismiss();
    });


  }

}
