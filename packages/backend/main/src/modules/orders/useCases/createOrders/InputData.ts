class InputData {
  public readonly description: string;

  public readonly userId: number;

  constructor({
    description,
    userId,
  }: {
    description: string;
    userId: number;
  }) {
    this.description = description;
    this.userId = userId;
  }
}

export default InputData;
