import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';
import { CreateDeliveryCommand } from 'src/domain/commands/delivery/create-delivery';
import { QualifyDeliveryCommand } from 'src/domain/commands/delivery/qualify-delivery';
import { DeliveryModel } from 'src/domain/models/delivery.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryImplementationRepository extends DeliveryRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  CreateDelivery(delivery: CreateDeliveryCommand): Observable<string> {
    return this.http.post<string>(environment.urlApiDeliveries, delivery);
  }

  DeleteDelivery(deliveryID: number): Observable<string> {
    return this.http.delete<string>(
      environment.urlApiDeliveries + '?deliveryID=' + deliveryID
    );
  }

  override QualifyDelivery(
    qualifyDelivery: QualifyDeliveryCommand
  ): Observable<string> {
    return this.http.put<string>(environment.urlApiDeliveries, qualifyDelivery);
  }
  GetDeliveryById(deliveryID: number): Observable<DeliveryModel> {
    return this.http.get<DeliveryModel>(
      environment.urlApiDeliveries + '/ById?deliveryID=' + deliveryID
    );
  }

  GetDeliveriesByUidUser(uidUser: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(
      environment.urlApiDeliveries + '/ByUidUser?uidUser=' + uidUser
    );
  }

  override GetDeliveriesByPathId(pathId: string): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(
      environment.urlApiDeliveries + '/ByPathId?pathId=' + pathId
    );
  }
}
