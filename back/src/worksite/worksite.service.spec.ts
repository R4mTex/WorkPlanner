import { Test, TestingModule } from '@nestjs/testing';
import { WorksiteService } from './worksite.service';
import { PrismaService } from '../../prisma/prisma.service';
import { fakerFR as faker } from '@faker-js/faker';
import { UploadService } from '../upload/upload.service';

describe('WorksiteService', () => {
    let service: WorksiteService;
    const mockPrismaService = {
        worksite: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        worksiteHasWorksiteType: {
            create: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
        },
        userHasWorksite: {
            create: jest.fn(),
        },
    };

    const mockUploadService = {
        deleteImage: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorksiteService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
                {
                    provide: UploadService,
                    useValue: mockUploadService,
                },
            ],
        }).compile();

        service = module.get<WorksiteService>(WorksiteService);
        mockPrismaService.worksite.create.mockClear();
        mockPrismaService.worksite.findMany.mockClear();
        mockPrismaService.worksite.findUnique.mockClear();
        mockPrismaService.worksite.update.mockClear();
        mockPrismaService.worksite.delete.mockClear();
        mockUploadService.deleteImage.mockClear();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create method', () => {
        it('Should create worksite', async () => {
            const mockWorksite = {
                name: `Chantier ${faker.company.name()}`,
                description: faker.lorem.lines(1),
                start: new Date(),
                end: new Date(),
                duration: 1,
                formattedDuration: '',
                picture: faker.image.url(),
                streetNumber: faker.location.buildingNumber(),
                streetName: faker.location.street(),
                postalCode: faker.location.zipCode(),
                city: faker.location.city(),
                country: 'France',
                worksiteTypes: [{ worksiteTypeId: 1 }],
            };

            const userId = 1;
            const prismaResponse = {
                ...mockWorksite,
                id: faker.number.int(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockPrismaService.worksite.create.mockResolvedValue(prismaResponse);
            mockPrismaService.worksiteHasWorksiteType.create.mockResolvedValue(
                prismaResponse,
            );
            mockPrismaService.userHasWorksite.create.mockResolvedValue({});
            const result = await service.create(userId, mockWorksite);

            expect(result).toEqual(prismaResponse);
            expect(mockPrismaService.worksite.create).toHaveBeenCalledTimes(1);
            expect(mockPrismaService.worksite.create).toHaveBeenCalledWith({
                data: {
                    name: mockWorksite.name,
                    description: mockWorksite.description,
                    start: mockWorksite.start,
                    end: mockWorksite.end,
                    duration: mockWorksite.duration,
                    formattedDuration: mockWorksite.formattedDuration,
                    picture: mockWorksite.picture,
                    streetNumber: mockWorksite.streetNumber,
                    streetName: mockWorksite.streetName,
                    postalCode: mockWorksite.postalCode,
                    country: mockWorksite.country,
                    city: mockWorksite.city,
                },
            });
        });

        it('Should throw error if prisma fails', async () => {
            const mockWorksite = {
                name: `Chantier ${faker.company.name()}`,
                description: faker.lorem.lines(1),
                start: new Date(),
                end: new Date(),
                duration: 1,
                formattedDuration: '',
                picture: faker.image.url(),
                streetNumber: faker.location.buildingNumber(),
                streetName: faker.location.street(),
                postalCode: faker.location.zipCode(),
                city: faker.location.city(),
                country: 'France',
                worksiteTypes: [{ worksiteTypeId: 1 }],
            };

            const userId = 1;

            mockPrismaService.worksite.create.mockRejectedValue(
                new Error(`user doesn't exist`),
            );

            await expect(service.create(userId, mockWorksite)).rejects.toThrow(
                'An error occurred while creating the worksite.',
            );
        });

        it('should return worksites for user', async () => {
            const userId = 1;
            const worksites = [
                {
                    id: 1,
                    name: 'Chantier 1',
                    city: 'Paris',
                    duration: 2,
                    start: new Date(),
                    end: new Date(),
                    userWorksites: [{ userId }],
                    worksiteTypes: [],
                },
            ];
            mockPrismaService.worksite.findMany.mockResolvedValue(worksites);

            const result = await service.findAll(userId, {});
            expect(result).toEqual(worksites);
            expect(mockPrismaService.worksite.findMany).toHaveBeenCalled();
        });

        it('should return message if no worksites found', async () => {
            const userId = 1;
            mockPrismaService.worksite.findMany.mockResolvedValue([]);

            const result = await service.findAll(userId, {});
            expect(result).toEqual({
                message: 'No worksites found for this user.',
            });
        });

        it('should return message for invalid start date', async () => {
            const userId = 1;
            const result = await service.findAll(userId, {
                start: 'invalid-date',
            });
            expect(result).toEqual({ message: 'Invalid start date' });
        });

        it('should return message for invalid end date', async () => {
            const userId = 1;
            const result = await service.findAll(userId, {
                end: 'invalid-date',
            });
            expect(result).toEqual({ message: 'Invalid end date' });
        });

        it('should throw NotFoundException on prisma error', async () => {
            const userId = 1;
            mockPrismaService.worksite.findMany.mockRejectedValue(
                new Error('DB error'),
            );
            await expect(service.findAll(userId, {})).rejects.toThrow(
                'Error while fetching worksites',
            );
        });

        it('should return a worksite', async () => {
            const userId = 1;
            const id = 2;
            const worksite = {
                id,
                name: 'Chantier',
                userWorksites: [{ userId }],
                worksiteTypes: [],
            };
            mockPrismaService.worksite.findUnique.mockResolvedValue(worksite);

            const result = await service.findOne(userId, id);
            expect(result).toEqual(worksite);
            expect(mockPrismaService.worksite.findUnique).toHaveBeenCalledWith({
                include: {
                    worksiteTypes: {
                        include: {
                            worksiteType: true,
                        },
                    },
                },
                where: {
                    id,
                    userWorksites: {
                        some: { userId },
                    },
                },
            });
        });

        it('should return null if not found', async () => {
            const userId = 1;
            const id = 2;
            mockPrismaService.worksite.findUnique.mockResolvedValue(null);

            const result = await service.findOne(userId, id);
            expect(result).toBeNull();
        });

        it('should throw NotFoundException if update fails', async () => {
            const id = 1;
            const updateWorksiteDto = { name: 'Updated' };
            mockPrismaService.worksite.update.mockRejectedValue(
                new Error('not found'),
            );
            await expect(service.update(id, updateWorksiteDto)).rejects.toThrow(
                'Worksite with id 1 not found',
            );
        });

        it('should delete a worksite', async () => {
            const id = 1;
            const deletedWorksite = { id, name: 'Deleted' };
            mockPrismaService.worksite.delete.mockResolvedValue(
                deletedWorksite,
            );

            const result = await service.remove(id);
            expect(result).toEqual(deletedWorksite);
            expect(mockPrismaService.worksite.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });
    });
});
