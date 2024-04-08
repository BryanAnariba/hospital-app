import { environment } from "../../environments/enviornments";
import { Role } from "../interfaces";

export class User {

  constructor (
    public name: string,
    public email: string,
    public img: string,
    public role: Role,
    public google: boolean,
    public isActive: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: string,
    // public password?: string,
  ) {}

  public printData() {
    return `User: {id: ${this._id}, name: ${this.name}, email: ${this.email}, img: ${this.img}, role: ${JSON.stringify(this.role)}, google: ${this.google}, isActive: ${this.isActive}, createdAt: ${this.createdAt}, updatedAt: ${this.updatedAt}}`;
  }

  public get imgUrl (): string {
    if (this.img.includes('https') || this.img.includes('http')) return this.img;
    if (this.img) return `${environment.base_url}/uploads/users/${this.img}`;
    return `${environment.base_url}/uploads/users/img-not-found.png`;
  }
}