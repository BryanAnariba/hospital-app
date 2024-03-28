import { v4 as uuid } from 'uuid';

export class Uuid {
  public static getUuid (): string {
    return uuid();
  }
}