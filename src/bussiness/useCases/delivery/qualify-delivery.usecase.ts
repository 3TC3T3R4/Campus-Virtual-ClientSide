import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';
import { QualifyDeliveryCommand } from 'src/domain/commands/delivery/qualify-delivery';

export class QualifyDeliveryUseCase
  implements UseCase<QualifyDeliveryCommand, string>
{
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  execute(qualifyDelivery: QualifyDeliveryCommand): Observable<string> {
    return this.deliveryRepository.QualifyDelivery(qualifyDelivery);
  }
}
