import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateDeliveryCommand } from 'src/domain/commands/delivery/create-delivery';
import { CreateDeliveryUseCase } from 'src/bussiness/useCases/delivery/create-delivery.usecase';
import { DeleteDeliveryUseCase } from 'src/bussiness/useCases/delivery/delete-delivery.usecase';
import { QualifyDeliveryUseCase } from 'src/bussiness/useCases/delivery/qualify-delivery.usecase';
import { QualifyDeliveryCommand } from 'src/domain/commands/delivery/qualify-delivery';
import { GetDeliveryByIdUseCase } from 'src/bussiness/useCases/delivery/get-delivery-by-id.usecase';
import { GetDeliveriesByUidUserUseCase } from 'src/bussiness/useCases/delivery/get-deliveries-by-uiduser.usecase';
import { GetDeliveriesByPathIdUseCase } from 'src/bussiness/useCases/delivery/get-deliveries-by-pathid.usecase';
import { DeliveryModel } from 'src/domain/models/delivery.model';
@Component({
  selector: 'sofka-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  createDeliveryForm: FormGroup;
  deleteDeliveryForm: FormGroup;
  qualifyDeliveryForm: FormGroup;
  getDeliveryByIDForm: FormGroup;
  getDeliveriesByUidUserForm: FormGroup;
  getDeliveriesByPathIDForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private CreateDeliveryUseCase: CreateDeliveryUseCase,
    private DeleteDeliveryUseCase: DeleteDeliveryUseCase,
    private QualifyDeliveryUseCase: QualifyDeliveryUseCase,
    private GetDeliveryByIdUseCase: GetDeliveryByIdUseCase,
    private GetDeliveriesByUidUserUseCase: GetDeliveriesByUidUserUseCase,
    private GetDeliveriesByPathIdUseCase: GetDeliveriesByPathIdUseCase
  ) {
    this.createDeliveryForm = new FormGroup({
      contentID: new FormControl('', [Validators.required]),
      uidUser: new FormControl('', [Validators.required]),
      DeliveryField: new FormControl('', [Validators.required]),
    });

    this.deleteDeliveryForm = new FormGroup({
      deliveryID: new FormControl(0, [Validators.required]),
    });

    this.qualifyDeliveryForm = new FormGroup({
      deliveryID: new FormControl(0, [Validators.required]),
      rating: new FormControl(0, [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });

    this.getDeliveryByIDForm = new FormGroup({
      deliveryID: new FormControl(0, [Validators.required]),
    });

    this.getDeliveriesByUidUserForm = new FormGroup({
      uidUser: new FormControl('', [Validators.required]),
    });

    this.getDeliveriesByPathIDForm = new FormGroup({
      pathID: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  createDelivery() {
    const createDeliveryCommand = new CreateDeliveryCommand(
      this.createDeliveryForm.value.contentID,
      this.createDeliveryForm.value.uidUser,
      this.createDeliveryForm.value.DeliveryField
    );
    this.CreateDeliveryUseCase.execute(createDeliveryCommand).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDelivery() {
    const deleteDeliveryCommand = this.deleteDeliveryForm.value.deliveryID;
    this.DeleteDeliveryUseCase.execute(deleteDeliveryCommand).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  qualifyDelivery() {
    const qualifyDeliveryCommand = new QualifyDeliveryCommand(
      this.qualifyDeliveryForm.value.deliveryID,
      this.qualifyDeliveryForm.value.rating,
      this.qualifyDeliveryForm.value.comment
    );
    this.QualifyDeliveryUseCase.execute(qualifyDeliveryCommand).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDeliveryById() {
    const deliveryID = this.getDeliveryByIDForm.value.deliveryID;
    this.GetDeliveryByIdUseCase.execute(deliveryID).subscribe(
      (response: DeliveryModel) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDeliveriesByUidUser() {
    const uidUser = this.getDeliveriesByUidUserForm.value.uidUser;
    this.GetDeliveriesByUidUserUseCase.execute(uidUser).subscribe(
      (response: DeliveryModel[]) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDeliveriesByPathID() {
    const pathID = this.getDeliveriesByPathIDForm.value.pathID;
    this.GetDeliveriesByPathIdUseCase.execute(pathID).subscribe(
      (response: DeliveryModel[]) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
