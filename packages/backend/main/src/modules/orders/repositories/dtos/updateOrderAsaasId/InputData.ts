class UpdateOrderAsaasIdInputData {
  public readonly id: number;

  public asaasId: string;

  public asaasUrl: string;

  constructor({
    id,
    asaasId,
    asaasUrl,
  }: {
    id: number;
    asaasId: string;
    asaasUrl: string;
  }) {
    this.id = id;
    this.asaasId = asaasId;
    this.asaasUrl = asaasUrl;
  }
}

export default UpdateOrderAsaasIdInputData;
