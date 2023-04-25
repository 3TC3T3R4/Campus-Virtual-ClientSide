import { NgModule } from '@angular/core';
import { DeliveryRepository } from 'src/bussiness/repositories/delivery/delivery.repository';
import { CreateDeliveryUseCase } from 'src/bussiness/useCases/delivery/create-delivery.usecase';
import { DeleteDeliveryUseCase } from 'src/bussiness/useCases/delivery/delete-delivery.usecase';
import { GetDeliveriesByPathIdUseCase } from 'src/bussiness/useCases/delivery/get-deliveries-by-pathid.usecase';
import { GetDeliveriesByUidUserUseCase } from 'src/bussiness/useCases/delivery/get-deliveries-by-uiduser.usecase';
import { GetDeliveryByIdUseCase } from 'src/bussiness/useCases/delivery/get-delivery-by-id.usecase';
import { QualifyDeliveryUseCase } from 'src/bussiness/useCases/delivery/qualify-delivery.usecase';
import { DeliveryImplementationRepository } from './delivery-implementation.repository';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const createDeliveryUseCaseFactory = (deliveryRepository: DeliveryRepository) =>
  new CreateDeliveryUseCase(deliveryRepository);
export const createDeliveryUseCaseProvider = {
  provide: CreateDeliveryUseCase,
  useFactory: createDeliveryUseCaseFactory,
  deps: [DeliveryRepository],
};

const deleteDeliveryUseCaseFactory = (deliveryRepository: DeliveryRepository) =>
  new DeleteDeliveryUseCase(deliveryRepository);
export const deleteDeliveryUseCaseProvider = {
  provide: DeleteDeliveryUseCase,
  useFactory: deleteDeliveryUseCaseFactory,
  deps: [DeliveryRepository],
};

const qualifyDeliveryUseCaseFactory = (
  deliveryRepository: DeliveryRepository
) => new QualifyDeliveryUseCase(deliveryRepository);
export const qualifyDeliveryUseCaseProvider = {
  provide: QualifyDeliveryUseCase,
  useFactory: qualifyDeliveryUseCaseFactory,
  deps: [DeliveryRepository],
};

const getDeliveryByIdUseCaseFactory = (
  deliveryRepository: DeliveryRepository
) => new GetDeliveryByIdUseCase(deliveryRepository);
export const getDeliveryByIdUseCaseProvider = {
  provide: GetDeliveryByIdUseCase,
  useFactory: getDeliveryByIdUseCaseFactory,
  deps: [DeliveryRepository],
};

const getDeliveriesByUidUserUseCaseFactory = (
  deliveryRepository: DeliveryRepository
) => new GetDeliveriesByUidUserUseCase(deliveryRepository);
export const getDeliveriesByUidUserUseCaseProvider = {
  provide: GetDeliveriesByUidUserUseCase,
  useFactory: getDeliveriesByUidUserUseCaseFactory,
  deps: [DeliveryRepository],
};

const getDeliveriesByPathIdUseCaseFactory = (
  deliveryRepository: DeliveryRepository
) => new GetDeliveriesByPathIdUseCase(deliveryRepository);
export const getDeliveriesByPathIdUseCaseProvider = {
  provide: GetDeliveriesByPathIdUseCase,
  useFactory: getDeliveriesByPathIdUseCaseFactory,
  deps: [DeliveryRepository],
};

@NgModule({
  providers: [
    createDeliveryUseCaseProvider,
    deleteDeliveryUseCaseProvider,
    qualifyDeliveryUseCaseProvider,
    getDeliveryByIdUseCaseProvider,
    getDeliveriesByUidUserUseCaseProvider,
    getDeliveriesByPathIdUseCaseProvider,
    {
      provide: DeliveryRepository,
      useClass: DeliveryImplementationRepository,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DeliveryModule {}
