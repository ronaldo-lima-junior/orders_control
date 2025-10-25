class TokenOutputData {
  public readonly userId: number;

  public readonly userName: string;

  constructor({ userId, userName }: { userId: number; userName: string }) {
    this.userId = userId;
    this.userName = userName;
  }
}

export default TokenOutputData;
