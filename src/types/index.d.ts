export type SignInFormPropType = {
  email: string;
  password: string;
};
export type SignUpFormPropType = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email:""
};

export type UserType = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  role?: string;
  email: string;
};

export type PaginationType<T> = {
  documents: T[];
  total: number;
  limit: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: false;
  nextPage: number | null;
  pages: number;
  prevPage: number | null;
};

export type AuthStateType = {
  loading: boolean;
  user: UserType | null;
  authenticated: boolean;
  refreshToken: string | null;
};

export type UserStateRoleType = "admin" | "user" | "guest";
export type AuriginAfricaRouteMetaType = {
  title?: string;
  requiresAuth: boolean;
  roles?: UserStateRoleType[];
};




