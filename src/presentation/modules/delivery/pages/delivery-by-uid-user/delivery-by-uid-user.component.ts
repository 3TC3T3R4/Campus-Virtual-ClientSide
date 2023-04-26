import { Component, OnInit } from '@angular/core';
import { GetDeliveriesByUidUserUseCase } from '../../../../../bussiness/useCases/delivery/get-deliveries-by-uiduser.usecase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryModel } from 'src/domain/models/delivery.model';

@Component({
  selector: 'sofka-delivery-by-uid-user',
  templateUrl: './delivery-by-uid-user.component.html',
  styleUrls: ['./delivery-by-uid-user.component.scss'],
})
export class DeliveryByUidUserComponent implements OnInit {
  getDeliveriesByUidUserForm: FormGroup;
  deliveryItems: DeliveryModel[] = [];
  deliveryItem: DeliveryModel;
  showDelivery = false;

  constructor(
    private GetDeliveriesByUidUserUseCase: GetDeliveriesByUidUserUseCase
  ) {
    this.getDeliveriesByUidUserForm = new FormGroup({
      uidUser: new FormControl('', [Validators.required]),
    });

    this.deliveryItem = {
      deliveryID: 0,
      contentID: '',
      uidUser: '',
      deliveryAt: new Date(),
      DeliveryField: '',
      rating: 0,
      comment: '',
      ratedAt: new Date(),
      stateDelivery: 1,
    };
  }

  ngOnInit(): void {}

  getDeliveriesByUidUser() {
    const uidUser = this.getDeliveriesByUidUserForm.value.uidUser;
    this.GetDeliveriesByUidUserUseCase.execute(uidUser).subscribe(
      (response: DeliveryModel[]) => {
        this.deliveryItems = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewDeliveryDetails(deliveryItem: DeliveryModel) {
    this.showDelivery = true;
    this.deliveryItem = deliveryItem;
    console.log(this.deliveryItem);
  }
}