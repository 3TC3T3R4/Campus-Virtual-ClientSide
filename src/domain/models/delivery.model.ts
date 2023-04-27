export interface DeliveryModel {
  deliveryID: number;
  contentID: string;
  uidUser: string;
  deliveryAt: Date;
  deliveryField: string;
  rating: number;
  comment: string;
  ratedAt: Date;
  stateDelivery: number;
}
