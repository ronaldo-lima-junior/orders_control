class GenerateBillingInputData {
  public readonly customer: string;

  public readonly value: number;

  constructor({ customer, value }: { customer: string; value: number }) {
    this.customer = customer;
    this.value = value;
  }
}

export default GenerateBillingInputData;
