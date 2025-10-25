class OutputData {
  public readonly list: {
    id: number;
    description: string;
    category: string;
    price: number;
    quantity: number;
  }[];

  public readonly pagination: {
    current: number;
    total: number;
    totalRows: number;
  };

  constructor({
    list,
    pagination,
  }: {
    list: {
      id: number;
      description: string;
      category: string;
      price: number;
      quantity: number;
    }[];
    pagination: {
      current: number;
      total: number;
      totalRows: number;
    };
  }) {
    this.list = list;
    this.pagination = pagination;
  }
}

export default OutputData;
