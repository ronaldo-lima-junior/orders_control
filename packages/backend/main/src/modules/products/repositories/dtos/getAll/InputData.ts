class GetAllProductsInputData {
  public readonly description?: string;

  public readonly category?: string;

  public readonly page?: number;

  public readonly rowsPerPage?: number;

  constructor({
    description,
    category,
    page,
    rowsPerPage,
  }: {
    description?: string;
    category?: string;
    page?: number;
    rowsPerPage?: number;
  }) {
    this.description = description;
    this.category = category;
    this.page = page;
    this.rowsPerPage = rowsPerPage;
  }
}

export default GetAllProductsInputData;
