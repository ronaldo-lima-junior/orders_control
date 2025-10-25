import { faker } from '@faker-js/faker';

import Entity from '@shared/core/Entity';

interface IUser {
  id: number;
  name: string;
  email: string;
  document: string;
  asaasId: string | null;
  createdAt: Date;
  deletedAt: Date | null;
  passwordHash: string | null;
}

class User implements Entity<IUser> {
  private id: number;

  private name: string;

  private email: string;

  private document: string;

  private asaasId: string | null;

  private createdAt: Date;

  private deletedAt: Date | null;

  private passwordHash: string | null;

  constructor({
    id,
    name,
    email,
    document,
    asaasId,
    createdAt,
    deletedAt,
    passwordHash,
  }: IUser) {
    this.setData({
      id,
      name,
      email,
      document,
      asaasId,
      createdAt,
      deletedAt,
      passwordHash,
    });
  }

  private setData(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.document = user.document;
    this.asaasId = user.asaasId;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
    this.passwordHash = user.passwordHash;
  }

  public getData(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      document: this.document,
      asaasId: this.asaasId,
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      passwordHash: this.passwordHash,
    };
  }

  public static createRandom(data?: Partial<IUser>): User {
    return new User({
      id: data?.id ?? faker.number.int(),
      name: data?.name ?? faker.person.fullName(),
      email: data?.email ?? faker.internet.email(),
      document: data?.document ?? faker.person.suffix(),
      asaasId: data?.asaasId ?? null,
      createdAt: data?.createdAt ?? faker.date.anytime(),
      deletedAt: data?.deletedAt ?? null,
      passwordHash: data?.passwordHash ?? null,
    });
  }

  public update(data: Partial<Omit<IUser, 'id'>>): void {
    this.asaasId = data?.asaasId || this.asaasId;
  }
}

export default User;
