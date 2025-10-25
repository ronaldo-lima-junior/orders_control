class InputData {
  public readonly orderId: number;

  public readonly itemId: number;

  constructor({ itemId, orderId }: { itemId: string; orderId: string }) {
    this.itemId = Number(itemId);
    this.orderId = Number(orderId);
  }
}

export default InputData;
