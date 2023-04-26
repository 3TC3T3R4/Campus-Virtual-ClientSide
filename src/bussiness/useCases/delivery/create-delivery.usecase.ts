import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { CreateDeliveryCommand } from 'src/domain/commands/delivery/create-delivery';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';

export class CreateDeliveryUseCase
  implements UseCase<CreateDeliveryCommand, string>
{
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  execute(delivery: CreateDeliveryCommand): Observable<string> {
    return this.deliveryRepository.CreateDelivery(delivery);
  }
}
