import { UserCreatedHospital } from "../interfaces";

export class Hospital {
    constructor (
        public _id: string,
        public name: string,
        public email: string,
        public isActive: boolean,
        public userCreatedHospital: UserCreatedHospital,
        public img: string,
    ) {}
}