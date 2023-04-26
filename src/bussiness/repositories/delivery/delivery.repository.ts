import { Observable } from 'rxjs';
import { CreateDeliveryCommand } from 'src/domain/commands/delivery/create-delivery';
import { QualifyDeliveryCommand } from 'src/domain/commands/delivery/qualify-delivery';
import { DeliveryModel } from 'src/domain/models/delivery.model';

export abstract class DeliveryRepository {
  protected apiUrl: string = '';

  abstract CreateDelivery(delivery: CreateDeliveryCommand): Observable<string>;
  abstract GetDeliveryById(deliveryID: number): Observable<DeliveryModel>;
  abstract DeleteDelivery(deliveryID: number): Observable<string>;
  abstract GetDeliveriesByUidUser(uidUser: string): Observable<DeliveryModel[]>;
  abstract QualifyDelivery(
    qualifyDelivery: QualifyDeliveryCommand
  ): Observable<string>;
  abstract GetDeliveriesByPathId(pathId: string): Observable<DeliveryModel[]>;
}
