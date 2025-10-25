class FindUserByIdOutputData {
  public readonly name: string;

  public readonly email: string;

  public readonly passwordHash: string;

  public readonly id: number;

  public asaasId: string;

  public readonly document: string;

  constructor({
    name,
    email,
    passwordHash,
    id,
    asaasId,
    document,
  }: {
    name: string;
    email: string;
    passwordHash: string;
    id: number;
    asaasId: string;
    document: string;
  }) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.id = id;
    this.asaasId = asaasId;
    this.document = document;
  }
}

export default FindUserByIdOutputData;
