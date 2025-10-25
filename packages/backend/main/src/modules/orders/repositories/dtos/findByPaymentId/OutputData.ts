class FindOrderByPaymentIdOutputData {
  public readonly id: number;

  public readonly description: string;

  constructor({ id, description }: { id: number; description: string }) {
    this.id = id;
    this.description = description;
  }
}

export default FindOrderByPaymentIdOutputData;
