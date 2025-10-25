class InputData {
  public readonly email: string;

  public readonly password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }
}

export default InputData;
