import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';

export class DeleteDeliveryUseCase implements UseCase<number, string> {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  execute(deliveryID: number): Observable<string> {
    return this.deliveryRepository.DeleteDelivery(deliveryID);
  }
}
