import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loading: boolean = false;
  products: Product[] = [];

  utils = inject(UtilsService);

  constructor() {}

  doRefresh($event) {}

  addUpdateProduct(product?: Product) {
    this.utils.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product },
    });
  }
}
