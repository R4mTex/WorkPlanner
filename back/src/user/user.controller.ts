import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateCompleteUserDto } from './dto/UpdateCompleteUserDto';
import { Public } from 'src/decorator/publicDecorator';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateCompleteUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.userService.update(
            id,
            updateDto.user,
            updateDto.userParams ?? {},
            updateDto.professional ?? {},
            response,
        );
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
