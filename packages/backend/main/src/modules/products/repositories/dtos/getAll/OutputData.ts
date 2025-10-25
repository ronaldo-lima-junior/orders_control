class GetAllProductsOutputData {
  public readonly list: {
    description: string;
    id: number;
    category: string;
    quantity: number;
    price: number;
  }[];

  constructor({
    list,
  }: {
    list: {
      description: string;
      id: number;
      category: string;
      quantity: number;
      price: number;
    }[];
  }) {
    this.list = list;
  }
}

export default GetAllProductsOutputData;
