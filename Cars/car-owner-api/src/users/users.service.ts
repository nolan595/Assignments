import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './user.model';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}
    async getAllUsers(): Promise<Users[]>{
        return this.prisma.user.findMany()
    }
    async getUser(username:string): Promise<Users | null> {
        return this.prisma.user.findUnique({where: {username}})
    }

    async createUser(username: string, password: string, dob: Date): Promise<Users> {
        const isoDate = new Date(dob); //date was not in right format originally
        if (isNaN(isoDate.getTime())){
            throw new Error('Invalid date format')
        }
        return this.prisma.user.create({
            data: {
                username, 
                password, 
                dob: isoDate.toISOString()},
        })
    }

    async getUserProfile(username: string): Promise<Users | null> {
        return this.prisma.user.findUnique({
            where: {username}
        })
    }

    

    //async findOne(username: string): Promise<User | undefined> {
    //    return this.prisma.user.findUnique({where: {username}});
    //}
}
