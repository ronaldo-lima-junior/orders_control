class CreateProductInputData {
  public readonly description: string;

  public readonly price: number;

  public readonly category: string;

  public readonly quantity: number;

  constructor({
    description,
    price,
    category,
    quantity,
  }: {
    description: string;
    price: number;
    category: string;
    quantity: number;
  }) {
    this.description = description;
    this.price = price;
    this.category = category;
    this.quantity = quantity;
  }
}

export default CreateProductInputData;
