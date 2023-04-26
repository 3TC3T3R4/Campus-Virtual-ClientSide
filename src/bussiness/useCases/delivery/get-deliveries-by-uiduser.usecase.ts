import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';
import { DeliveryModel } from 'src/domain/models/delivery.model';

export class GetDeliveriesByUidUserUseCase
  implements UseCase<string, DeliveryModel[]>
{
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  execute(uidUser: string): Observable<DeliveryModel[]> {
    return this.deliveryRepository.GetDeliveriesByUidUser(uidUser);
  }
}
