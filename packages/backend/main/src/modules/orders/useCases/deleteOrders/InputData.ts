class InputData {
  public readonly id: number;

  constructor({ id }: { id: string }) {
    this.id = Number(id);
  }
}

export default InputData;
