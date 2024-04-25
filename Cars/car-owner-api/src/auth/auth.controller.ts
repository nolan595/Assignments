import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {Public} from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthToken } from './dto/authToken';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @ApiOperation({summary: 'User Signup'})
    @ApiBody({type: SignUpDto})
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.dob)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({summary: 'User Login'})
    @ApiBody({type: LoginDto})
    @ApiResponse({status: 200, description: 'Sucessful Login', type: AuthToken})
    signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }






}
