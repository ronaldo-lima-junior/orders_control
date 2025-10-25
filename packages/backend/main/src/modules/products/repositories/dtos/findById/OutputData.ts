class FindProductByIdOutputData {
  public readonly description: string;

  public readonly price: number;

  public readonly category: string;

  public readonly quantity: number;

  public readonly id: number;

  constructor({
    description,
    price,
    category,
    quantity,
    id,
  }: {
    description: string;
    price: number;
    category: string;
    quantity: number;
    id: number;
  }) {
    this.description = description;
    this.price = price;
    this.category = category;
    this.quantity = quantity;
    this.id = id;
  }
}

export default FindProductByIdOutputData;
