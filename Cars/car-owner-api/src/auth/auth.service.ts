import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<{access_token: string}> {
        const user = await this.usersService.getUser(username);
        if (!user || user.password !== pass) {
            throw new UnauthorizedException('Invalid username or password')
        }
        const payload = {sub: user.id, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

    async signUp(
        username: string,
        password: string,
        dob: Date,

    ): Promise<{access_token: string}> {
        const exisitngUser = await this.usersService.getUser(username); // check if username already exists
        if (exisitngUser) {
            throw new ConflictException('Username already exists');
        }

        const newUser = await this.usersService.createUser(username, password, dob)
        const payload = {sub: newUser.id, username: newUser.username};

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
