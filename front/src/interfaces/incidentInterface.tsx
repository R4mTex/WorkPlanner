export interface IncidentInterface {
    id?: number;
    name: string;
    description: string;
    start: Date;
    end: Date;
    status: string;
    incidentTypeId: number;
    incidentTypes?: {
        incidentId: number;
        incidentTypeId: number;
        incidentType: {
            id: number;
            name: string;
        };
    }[];
}
