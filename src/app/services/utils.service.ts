import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingController = inject(LoadingController);
  toastController = inject(ToastController);


  router = inject(Router);

  loading() {
    return this.loadingController.create({
      message: 'Please wait...',
    });
  }

  async showToast(op?: ToastOptions) {
    const toast = await this.toastController.create(op);
    toast.present();
  }

  
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

}
