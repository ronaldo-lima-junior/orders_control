class InputData {
  public readonly filter: {
    description?: string;
    category?: string;
  };

  public readonly pagination: {
    page: number;
    rowsPerPage: number;
  };

  constructor({
    description,
    category,
    page = '0',
    rowsPerPage = '20',
  }: {
    description?: string;
    category?: string;
    page?: string;
    rowsPerPage?: string;
  }) {
    this.filter = {
      description,
      category,
    };
    this.pagination = {
      page: Number(page),
      rowsPerPage: page ? Number(rowsPerPage) : 20,
    };
  }
}

export default InputData;
