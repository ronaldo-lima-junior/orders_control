class UpdateUserAsaasIdInputData {
  public readonly id: number;

  public readonly asaasId: string;

  constructor({ id, asaasId }: { id: number; asaasId: string }) {
    this.id = id;
    this.asaasId = asaasId;
  }
}

export default UpdateUserAsaasIdInputData;
