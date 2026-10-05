import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '@prisma/client';

export class Task {
    static countTask = 0;

    constructor(createTaskDto: CreateTaskDto) {
        Task.countTask++;
        this.id = Task.countTask;
        this.name = createTaskDto.name;
        this.description = createTaskDto.description;
        this.start = new Date(createTaskDto.start);
        this.end = new Date(createTaskDto.end);
        this.status = createTaskDto.status;
        this.worksiteId = createTaskDto.worksiteId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    id: number;

    name: string;

    description: string;

    start: Date;

    end: Date;

    status: TaskStatus;

    worksiteId: number;

    createdAt: Date;

    updatedAt: Date;
}
