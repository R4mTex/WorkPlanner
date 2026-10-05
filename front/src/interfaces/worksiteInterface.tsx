import { WorkSiteTypeInterface } from "./worksiteTypeInterface";

export interface Professional {
	id: number;
	phoneNumber: string;
	name: string;
	city: string;
	country: string;
	legalStatus: string;
	managerName: string;
	postalCode: string;
	streetName: string;
	streetNumber: string | null;
	workforce: number;
	createdAt: string;
	updatedAt: string;
	userId: number;
}

export interface Trade {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserHasTrade {
	userId: number;
	tradeId: number;
	trade: Trade;
}

export interface User {
	id: number;
	email: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	professional: Professional;
	userHasTrade: UserHasTrade[];
}
export interface WorksiteType {
	worksiteId?: number;
	worksiteTypeId: number;
	worksiteType?: WorkSiteTypeInterface;
}
export interface UserWorksite {
	userId: number;
	worksiteId: number;
	user: User;
}

export interface WorksiteInterface {
	id: number;
	name: string;
	description: string;
	start: Date;
	end: Date;
	duration: number;
	formattedDuration: string;
	picture?: string;
	streetNumber: string | null;
	streetName: string;
	postalCode: string;
	country?: string;
	city?: string;
	createdAt: string;
	updatedAt?: string;
	worksiteTypes: WorksiteType[];
	userWorksites: UserWorksite[];
}
