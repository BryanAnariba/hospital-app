export class User {

  constructor (
    public name: string,
    public email: string,
    public img: string,
    public role: string,
    public google: boolean,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: string,
    public password?: string,
  ) {

  }
}