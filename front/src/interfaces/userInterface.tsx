export type Role = "Individual" | "Professional";

export interface UserInterface {
    email: string;
    password: string;
    role: Role;
    // created_at: Date;
    // updated_at: Date;
}

interface UserParams {
    lastname?: string;
    firstname?: string;
    phoneNumber?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

interface Professional {
    name?: string;
    phoneNumber?: string;
    managerName?: string;
    streetNumber?: string;
    streetName?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

interface Trade {
    trade: {
        name: string;
    };
}

interface Task {
    task: {
        name: string;
        description: string;
    };
}

export interface User extends UserInterface {
    userParams?: UserParams;
    professional?: Professional;
    userHasTrade?: Trade[];
    userTasks?: Task[];
}
