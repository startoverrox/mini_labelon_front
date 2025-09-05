export interface User {
  role: string;
  name: string;
  email: string;
  token: string;
}

export interface UserSet {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
