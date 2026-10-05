export enum IntervenantStatus {
  Disponible = 'Disponible',
  Occupe = 'Occupe',
  EnPause = 'EnPause',
}

export interface Task {
  taskId: number;
  intervenantId: number;
}

export interface IntervenantInterface {
  id: number;
  lastname: string;
  firstname: string;
  phoneNumber: string;
  email: string;
  status: IntervenantStatus;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
}
