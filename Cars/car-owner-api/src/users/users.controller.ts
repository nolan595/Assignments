import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {UserProfileDto} from './dto/userProfile.dto'


@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get('profile')
    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({status: 200, description: 'User profile', type: UserProfileDto})
    getUserProfile(@Request() req) {
        return req.user
    }
}
