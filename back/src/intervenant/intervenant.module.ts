import { IntervenantController } from './intervenant.controller';
import { IntervenantService } from './intervenant.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [IntervenantController],
    providers: [IntervenantService],
})
export class IntervenantModule {}
