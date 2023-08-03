export const defaultUser = {
  firstname: '',
  lastname: '',
  email: '',
  occupation: ''
}

export type User = typeof defaultUser;

export interface APIPayload {
  url: string;
  config: Record<string, any>;
  body?: Record<string, any>;
  errorMsg: string;
  successMsg?: string;
}