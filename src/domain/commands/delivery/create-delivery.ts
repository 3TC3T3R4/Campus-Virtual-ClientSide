export class CreateDeliveryCommand {
  contentID: string;
  uidUser: string;
  DeliveryField: string;

  constructor(contentID: string, uidUser: string, DeliveryField: string) {
    this.contentID = contentID;
    this.uidUser = uidUser;
    this.DeliveryField = DeliveryField;
  }
}
