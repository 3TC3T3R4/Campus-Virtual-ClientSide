import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetDeliveriesByPathIdUseCase } from 'src/bussiness/useCases/delivery/get-deliveries-by-pathid.usecase';
import { DeliveryModel } from 'src/domain/models/delivery.model';
import { QualifyDeliveryUseCase } from 'src/bussiness/useCases/delivery/qualify-delivery.usecase';
import { DeleteDeliveryUseCase } from 'src/bussiness/useCases/delivery/delete-delivery.usecase';
import { QualifyDeliveryCommand } from 'src/domain/commands/delivery/qualify-delivery';
@Component({
  selector: 'sofka-delivery-by-path-id',
  templateUrl: './delivery-by-path-id.component.html',
  styleUrls: ['./delivery-by-path-id.component.scss'],
})
export class DeliveryByPathIDComponent implements OnInit {
  getDeliveriesByPathIDForm: FormGroup;
  deliveryItems: DeliveryModel[] = [];
  deliveryItem: DeliveryModel;
  showDelivery = false;
  showQualifyDelivery = false;

  qualifyDeliveryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private GetDeliveriesByPathIdUseCase: GetDeliveriesByPathIdUseCase,
    private QualifyDeliveryUseCase: QualifyDeliveryUseCase,
    private DeleteDeliveryUseCase: DeleteDeliveryUseCase
  ) {
    this.getDeliveriesByPathIDForm = new FormGroup({
      pathID: new FormControl('', [Validators.required]),
    });

    this.qualifyDeliveryForm = new FormGroup({
      deliveryID: new FormControl(0, [Validators.required]),
      rating: new FormControl(0, [Validators.required]),
      comment: new FormControl('', [Validators.required]),
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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getDeliveriesByPathID() {
    const pathID = this.getDeliveriesByPathIDForm.value.pathID;
    this.GetDeliveriesByPathIdUseCase.execute(pathID).subscribe(
      (response: DeliveryModel[]) => {
        this.deliveryItems = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDelivery(deliveryItem: DeliveryModel) {
    this.DeleteDeliveryUseCase.execute(deliveryItem.deliveryID).subscribe(
      (response) => {
        console.log(response);
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

  qualifyDelivery(deliveryItem: DeliveryModel) {
    this.showQualifyDelivery = true;
    const deliveryID = deliveryItem.deliveryID;
    localStorage.setItem('deliveryID', deliveryID.toString());
  }

  confirmQualify() {
    const deliveryID = localStorage.getItem('deliveryID');
    if (deliveryID != null) {
      const command = new QualifyDeliveryCommand(
        +deliveryID,
        this.qualifyDeliveryForm.value.rating,
        this.qualifyDeliveryForm.value.comment
      );
      this.QualifyDeliveryUseCase.execute(command).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      this.showDelivery = false;
      this.showQualifyDelivery = false;
    } else {
      console.log('No se pudo obtener el deliveryID');
    }
  }
}