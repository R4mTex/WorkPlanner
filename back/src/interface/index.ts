export interface Filters {
  name?: string;
  duration?: number;
  startDate?: Date;
  endDate?: Date;
  sortOrder?: 'asc' | 'desc';
}

export interface SignIn {
  email: string;
  password: string;
}
