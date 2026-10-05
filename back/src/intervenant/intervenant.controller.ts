import { Controller, Get } from '@nestjs/common';
import { IntervenantService } from './intervenant.service';
import { Intervenant } from '@prisma/client';

@Controller('intervenants')
export class IntervenantController {
    constructor(private readonly intervenantService: IntervenantService) {}

    @Get()
    async findAll(): Promise<Intervenant[]> {
        return this.intervenantService.findAll();
    }
}
