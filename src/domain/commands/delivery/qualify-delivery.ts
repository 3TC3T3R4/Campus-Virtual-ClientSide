export class QualifyDeliveryCommand {
  deliveryID: number;
  rating: number;
  comment: string;

  constructor(deliveryID: number, rating: number, comment: string) {
    this.deliveryID = deliveryID;
    this.rating = rating;
    this.comment = comment;
  }
}
