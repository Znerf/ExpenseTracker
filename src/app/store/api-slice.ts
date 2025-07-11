import { createApi, fetchBaseQuery } from 'ngrx-rtk-query';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstname: string;
  lastname: string;
  dob: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  tagTypes: ['Counter'],
  endpoints: (build) => ({
    getCount: build.query<UserResponse, void>({
      query: () => ({
        url: `logins`,
      }),
      providesTags: ['Counter'],
    }),
    login: build.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    signup: build.mutation<UserResponse, SignupRequest>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<UserResponse, RegisterRequest>({
      query: (body) => ({
        url: 'logins',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetCountQuery, useLoginMutation, useSignupMutation, useRegisterMutation } = counterApi;
