class DeleteOrderItemInputData {
  public readonly itemId: number;

  public readonly productId: number;

  public readonly quantity: number;

  constructor({
    itemId,
    productId,
    quantity,
  }: {
    itemId: number;
    productId: number;
    quantity: number;
  }) {
    this.itemId = itemId;
    this.productId = productId;
    this.quantity = quantity;
  }
}

export default DeleteOrderItemInputData;
