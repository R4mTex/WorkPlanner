import { Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';
@Injectable()
export class UploadService {
    async deleteImage(fileName: string) {
        const filePath = join(
            __dirname,
            '../../..',
            'uploads',
            'worksite-images',
            fileName,
        );

        try {
            await unlink(filePath);
        } catch (error) {
            console.error(`❌ Erreur de suppression : ${error.message}`);
        }
    }
}
