class InputData {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly document: string;

  constructor({
    name,
    email,
    password,
    document,
  }: {
    name: string;
    email: string;
    password: string;
    document: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.document = document;
  }
}

export default InputData;
