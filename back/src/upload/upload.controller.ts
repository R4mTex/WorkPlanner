import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import { Public } from 'src/decorator/publicDecorator';

@Controller('upload')
export class UploadController {
    @Post('worksite-image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/worksite-images',
                filename: (request, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const extension = extname(file.originalname);
                    const filename = `worksite-${uniqueSuffix}${extension}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const imageUrl = `http://127.0.0.1:3000/upload/${file.filename}`;
        return { url: imageUrl };
    }

    @Public()
    @Get(':filename')
    getImage(@Param('filename') filename: string, @Res() response: Response) {
        const imagePath = join(
            __dirname,
            '../../..',
            'uploads',
            'worksite-images',
            filename,
        );

        if (!fs.existsSync(imagePath)) {
            throw new NotFoundException('Image non trouvée');
        }

        response.sendFile(imagePath);
    }
}
