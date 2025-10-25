class GenerateBillingOutputData {
  public readonly asaasId: string;

  public readonly invoiceUrl: string;

  constructor({
    asaasId,
    invoiceUrl,
  }: {
    asaasId: string;
    invoiceUrl: string;
  }) {
    this.asaasId = asaasId;
    this.invoiceUrl = invoiceUrl;
  }
}

export default GenerateBillingOutputData;
