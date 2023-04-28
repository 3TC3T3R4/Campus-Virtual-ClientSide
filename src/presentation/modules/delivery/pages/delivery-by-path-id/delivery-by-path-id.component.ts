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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AverageFinalRatingUseCase } from '../../../../../bussiness/useCases/registration/average-final-rating.usecase';
import { GetUserByIdUseCase } from '../../../../../bussiness/useCases/user/get-user-by-id.usecase';
import { UserModel } from 'src/domain/models/user/user.model';
@Component({
  selector: 'sofka-delivery-by-path-id',
  templateUrl: './delivery-by-path-id.component.html',
  styleUrls: ['./delivery-by-path-id.component.scss'],
})
export class DeliveryByPathIDComponent implements OnInit {
  render!: boolean;
  empty: boolean;
  searching = false;
  //routes
  routeDashboard: string[];

  //variables
  deliveryItems: DeliveryModel[] = [];
  deliveryItem: DeliveryModel;
  pathID!: string;
  traineeID!: string;
  trainee!: UserModel;
  showQualifyDelivery = false;
  qualifyDeliveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private GetDeliveriesByPathIdUseCase: GetDeliveriesByPathIdUseCase,
    private QualifyDeliveryUseCase: QualifyDeliveryUseCase,
    private DeleteDeliveryUseCase: DeleteDeliveryUseCase,
    private averageFinalRatingUseCase: AverageFinalRatingUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private routeActive: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.empty = false;
    this.routeDashboard = ['../../learningpaths'];

    this.qualifyDeliveryForm = new FormGroup({
      deliveryID: new FormControl(0, [Validators.required]),
      rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      comment: new FormControl('', [Validators.required]),
    });

    this.deliveryItem = {
      deliveryID: 0,
      contentID: '',
      uidUser: '',
      deliveryAt: new Date(),
      deliveryField: '',
      rating: 0,
      comment: '',
      ratedAt: new Date(),
      stateDelivery: 1,
    };

    setTimeout(() => {
      this.render = true;
    }, 1000);
  }

  ngOnInit(): void {
    this.getDeliveriesByPathID();
  }

  getDeliveriesByPathID() {
    if (this.routeActive.snapshot.params['pathID']) {
      this.pathID = this.routeActive.snapshot.params['pathID'];
      this.GetDeliveriesByPathIdUseCase.execute(this.pathID).subscribe(
        (response: DeliveryModel[]) => {
          this.deliveryItems = response;
        },
        (error) => {
          this.empty = true;
          console.log(error);
        }
      );
    }
  }

  deleteDelivery(deliveryItem: DeliveryModel) {
    let subDeleteDelivery = this.DeleteDeliveryUseCase.execute(
      deliveryItem.deliveryID
    ).subscribe(
      (response) => {
        this.toastr.success(response, '', {
          timeOut: 2500,
          positionClass: 'toast-bottom-right',
        });
        this.getDeliveriesByPathID();
      },
      (error) => {
        this.toastr.error('Delivery was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      () => {
        subDeleteDelivery.unsubscribe();
      }
    );
  }

  qualifyDelivery(deliveryItem: DeliveryModel) {
    let subGetUser = this.getUserByIdUseCase
      .execute(deliveryItem.uidUser)
      .subscribe({
        next: (response) => {
          this.trainee = response;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          subGetUser.unsubscribe();
        },
      });
    setTimeout(() => {
      this.showQualifyDelivery = true;
      this.traineeID = deliveryItem.uidUser;
      const deliveryID = deliveryItem.deliveryID;
      localStorage.setItem('deliveryID', deliveryID.toString());
    }, 700);
  }

  confirmQualify() {
    const deliveryID = localStorage.getItem('deliveryID') as string;
    const command = new QualifyDeliveryCommand(
      +deliveryID,
      this.qualifyDeliveryForm.value.rating,
      this.qualifyDeliveryForm.value.comment
    );
    let subQualify = this.QualifyDeliveryUseCase.execute(command).subscribe(
      (response) => {
        this.toastr.success(response, '', {
          timeOut: 2500,
          positionClass: 'toast-bottom-right',
        });
        this.getDeliveriesByPathID();
      },
      (error) => {
        this.toastr.error('Delivery was no qualified.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      () => {
        subQualify.unsubscribe();
        let subAverageRating = this.averageFinalRatingUseCase
          .execute({ uidUser: this.traineeID, pathID: this.pathID })
          .subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              subAverageRating.unsubscribe();
            },
          });
      }
    );
    this.showQualifyDelivery = false;
  }
}
