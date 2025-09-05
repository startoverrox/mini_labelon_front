export interface ApiWrapper<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
  status?: number;
}
