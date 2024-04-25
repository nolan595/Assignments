import {Prisma} from '@prisma/client'

export class Users {
    id?: number;
    username: string;
    password: string;
    dob: string | Date;

}