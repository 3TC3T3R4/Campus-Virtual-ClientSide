import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';
import { DeliveryModel } from 'src/domain/models/delivery.model';

export class GetDeliveryByIdUseCase implements UseCase<number, DeliveryModel> {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  execute(deliveryID: number): Observable<DeliveryModel> {
    return this.deliveryRepository.GetDeliveryById(deliveryID);
  }
}
