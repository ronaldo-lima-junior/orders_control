import { faker } from '@faker-js/faker';
import Entity from '@shared/core/Entity';
import { IO } from 'inspector/promises';

export enum EOrderStatus {
  open = 'ABERTO',
  send = 'ENVIADO',
  paid = 'PAGO',
  canceled = 'CANCELADO',
  received = 'RECEBIDO',
  refunded = 'ESTORNADA',
}

export enum EAsaasEvents {
  deleted = 'PAYMENT_DELETED',
  received = 'PAYMENT_RECEIVED',
  authorized = 'PAYMENT_AUTHORIZED',
  refunded = 'PAYMENT_REFUNDED',
}

interface IOrder {
  id: number;
  description: string;
  status: EOrderStatus;
  registeredAt: string;
  createdAt: Date;
  deletedAt: Date | null;
  asaasId: string | null;
  asaasUrl: string | null;
  user: {
    id: number;
    name: string;
  };
  items: {
    id: number;
    orderId: number;
    productId: number;
    productPrice: number;
    productQuantity: number;
    deletedAt: Date | null;
  }[];
}

class Order implements Entity<IOrder> {
  private id: number;

  private description: string;

  private status: EOrderStatus;

  private registeredAt: string;

  private createdAt: Date;

  private deletedAt: Date | null;

  private asaasId: string | null;

  private asaasUrl: string | null;

  private user: {
    id: number;
    name: string;
  };

  private items: {
    id: number;
    orderId: number;
    productId: number;
    productPrice: number;
    productQuantity: number;
    deletedAt: Date | null;
  }[];

  constructor({
    id,
    description,
    status,
    registeredAt,
    createdAt,
    deletedAt,
    asaasId,
    asaasUrl,
    user,
    items,
  }: IOrder) {
    this.setData({
      id,
      description,
      status,
      registeredAt,
      createdAt,
      deletedAt,
      asaasId,
      asaasUrl,
      user,
      items,
    });
  }

  private setData(order: IOrder) {
    ((this.id = order.id),
      (this.description = order.description),
      (this.status = order.status),
      (this.registeredAt = order.registeredAt),
      (this.createdAt = order.createdAt),
      (this.deletedAt = order.deletedAt),
      (this.asaasId = order.asaasId),
      (this.asaasUrl = order.asaasUrl),
      (this.user = order.user),
      (this.items = order.items));
  }

  public getData(): IOrder {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
      registeredAt: this.registeredAt,
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      asaasId: this.asaasId,
      asaasUrl: this.asaasUrl,
      user: this.user,
      items: this.items,
    };
  }

  public static createRandom(data?: Partial<IOrder>): Order {
    return new Order({
      id: data?.id ?? faker.number.int(),
      description: data?.description ?? faker.commerce.product(),
      status: data?.status ?? faker.helpers.enumValue(EOrderStatus),
      registeredAt: data?.registeredAt ?? faker.date.anytime().toString(),
      createdAt: data?.createdAt ?? faker.date.anytime(),
      deletedAt: data?.deletedAt ?? null,
      asaasId: data?.asaasId ?? faker.commerce.product(),
      asaasUrl: data?.asaasUrl ?? faker.commerce.product(),
      user: {
        id: data?.user?.id ?? faker.number.int(),
        name: data?.user?.name ?? faker.person.fullName(),
      },
      items: [
        {
          id: data?.items?.[0]?.id ?? faker.number.int(),
          orderId: data?.items?.[0]?.orderId ?? faker.number.int(),
          productId: data?.items?.[0]?.productId ?? faker.number.int(),
          productPrice: data?.items?.[0]?.productPrice ?? faker.number.int(),
          productQuantity:
            data?.items?.[0]?.productQuantity ?? faker.number.int(),
          deletedAt: data?.items?.[0]?.deletedAt ?? null,
        },
      ],
    });
  }

  public update(data: Partial<Omit<IOrder, 'id'>>): void {
    this.description = data?.description || this.description;
    this.status = data?.status || this.status;
    this.asaasId = data?.asaasId || this.asaasId;
    this.asaasUrl = data?.asaasUrl || this.asaasUrl;
    this.items = data?.items || this.items;
  }
}

export default Order;
