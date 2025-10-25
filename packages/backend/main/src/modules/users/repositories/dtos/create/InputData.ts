class CreateUserInputData {
  public readonly name: string;

  public readonly email: string;

  public readonly passwordHash: string;

  public readonly document: string;

  constructor({
    name,
    email,
    passwordHash,
    document,
  }: {
    name: string;
    email: string;
    passwordHash: string;
    document: string;
  }) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.document = document;
  }
}

export default CreateUserInputData;
