import { Component, OnInit } from '@angular/core';
import { GetDeliveriesByUidUserUseCase } from '../../../../../bussiness/useCases/delivery/get-deliveries-by-uiduser.usecase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryModel } from 'src/domain/models/delivery.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sofka-delivery-by-uid-user',
  templateUrl: './delivery-by-uid-user.component.html',
  styleUrls: ['./delivery-by-uid-user.component.scss'],
})
export class DeliveryByUidUserComponent implements OnInit {
  empty: boolean;
  searching = false;

  uidUser: string;
  //routes
  routeDashboard: string[];

  deliveryItems: DeliveryModel[] = [];
  deliveryItem: DeliveryModel;
  showDelivery = false;

  constructor(
    private GetDeliveriesByUidUserUseCase: GetDeliveriesByUidUserUseCase,
    private routerActive: ActivatedRoute,
    private router: Router
  ) {
    this.empty = false;
    // this.getDeliveriesByUidUserForm = new FormGroup({
    //   uidUser: new FormControl('', [Validators.required]),
    // });

    this.routeDashboard = ['../'];

    this.uidUser = 'user3';

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

  ngOnInit(): void {
    this.getDeliveriesByUidUser();
  }

  getDeliveriesByUidUser() {
    var uidUser = this.routerActive.snapshot.paramMap.get('uidUser');
    this.GetDeliveriesByUidUserUseCase.execute(this.uidUser).subscribe(
      (response: DeliveryModel[]) => {
        this.deliveryItems = response;
      },
      (error) => {
        this.empty = true;
        console.log(error);
      }
    );
  }

  viewDeliveryDetails(deliveryItem: DeliveryModel) {
    this.showDelivery = true;
    this.deliveryItem = deliveryItem;
    console.log(this.deliveryItem);
  }

  closeDeliveryDetails() {
    this.showDelivery = false;
  }
}
