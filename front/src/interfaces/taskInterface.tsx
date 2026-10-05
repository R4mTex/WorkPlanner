import { IncidentInterface } from "./incidentInterface";

export interface TaskIncident {
    taskId: number;
    incidentId: number;
    incident: IncidentInterface;
}

export interface taskInterface {
    id: number;
    start: Date;
    end: Date;
    name: string;
    description: string;
    duration: number;
    status: string;
    worksiteId?: number;
    incidents?: TaskIncident[];
}
