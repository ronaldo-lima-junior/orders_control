class RegisterCustomerInputData {
  public readonly name: string;

  public readonly cpfCnpj: string;

  constructor({ name, cpfCnpj }: { name: string; cpfCnpj: string }) {
    this.name = name;
    this.cpfCnpj = cpfCnpj;
  }
}

export default RegisterCustomerInputData;
