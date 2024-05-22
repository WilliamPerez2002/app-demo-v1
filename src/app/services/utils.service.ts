import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingController = inject(LoadingController);
  toastController = inject(ToastController);

  router = inject(Router);

  modalController = inject(ModalController);

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

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  //manejo de modales

  async presentModal(opt: ModalOptions) {
    const modal = await this.modalController.create(opt);
    await modal.present();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 100,
      allowEditing: false,
      source: CameraSource.Prompt,
      promptLabelHeader: promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Tomar una foto',
    });
  }
}
