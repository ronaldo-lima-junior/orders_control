class InputData {
  public readonly orderId: number;

  public readonly product: {
    id: number;
    price: number;
    quantity: number;
  };

  constructor({
    orderId,
    product,
  }: {
    orderId: string;
    product: {
      id: number;
      price: number;
      quantity: number;
    };
  }) {
    this.orderId = Number(orderId);
    this.product = product;
  }
}

export default InputData;
