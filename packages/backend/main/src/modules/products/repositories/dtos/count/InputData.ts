class CountProductsInputData {
  public readonly description?: string;

  public readonly category?: string;

  constructor({
    description,
    category,
  }: {
    description?: string;
    category?: string;
  }) {
    this.description = description;
    this.category = category;
  }
}

export default CountProductsInputData;
