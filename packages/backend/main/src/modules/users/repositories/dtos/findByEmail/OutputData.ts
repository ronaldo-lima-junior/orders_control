class FindUserByEmailOutputData {
  public readonly name: string;

  public readonly email: string;

  public readonly passwordHash: string;

  public readonly id: number;

  constructor({
    name,
    email,
    passwordHash,
    id,
  }: {
    name: string;
    email: string;
    passwordHash: string;
    id: number;
  }) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.id = id;
  }
}

export default FindUserByEmailOutputData;
