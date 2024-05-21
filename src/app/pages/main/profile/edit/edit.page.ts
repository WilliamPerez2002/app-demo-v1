import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl(''),
  });

  firebase = inject(FirebaseService)

  utils = inject(UtilsService);

  name: string;
  email: string;


  async ngOnInit() {


    try {

      let userData = this.utils.getFromLocalStorage('user');

      console.log(userData)

      this.name = userData.name;
      this.email = userData.email;

      this.form.setValue({
        uid: userData.uid, // Puedes reemplazar esto con el uid del usuario si lo tienes
        name: this.name,
        email: this.email
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async changePassword() {

    const loading = await this.utils.loading();;

    loading.present();

    this.firebase.resetPassword(this.email).then(res => {
      this.utils.showToast({
        message: 'Se ha enviado un correo para restablecer la contraseña',
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
        duration: 3000
      })


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

  async setUserInfo(uid: string) {
    let path = `users/${uid}`;
    let data = {
      name: this.form.value.name,
      email: this.form.value.email,
      uid: this.utils.getFromLocalStorage('user').uid
    }

    this.firebase
      .setDocument(path, data)
      .then(async (res) => {
        let name = this.utils.getFromLocalStorage('user').name;
        let email = this.utils.getFromLocalStorage('user').email;
        this.utils.saveInLocalStorage('user', { uid: uid, name: this.form.value.name, email: email });
      })
      .catch((err) => {
        this.utils.showToast({
          message: err.message,
          color: 'danger',
          position: 'middle',
          duration: 3000, //three seconds
          icon: 'alert-circle-outline',
        });
      });
  }


  async submit() {
    const loading = await this.utils.loading();
    await loading.present();
    this.firebase.updateProfile(this.form.value.name).then((res) => {
      console.log(res);
      let uid = this.utils.getFromLocalStorage('user').uid;
      this.setUserInfo(uid)

      this.utils.showToast({
        message: 'Nombre actualizado',
        color: 'success',
        position: 'middle',
        duration: 3000, //three seconds
        icon: 'alert-circle-outline',
      });
      this.utils.routerLink('/main/home');
    }).catch((err) => {
      this.utils.showToast({
        message: err.message,
        color: 'danger',
        position: 'middle',
        duration: 3000, //three seconds
        icon: 'alert-circle-outline',
      });
    }).finally(() => {
      loading.dismiss();
    })






  }




}
