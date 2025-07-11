import { createApi, fetchBaseQuery } from 'ngrx-rtk-query';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/users/' }),
  tagTypes: ['Counter'],
  endpoints: (build) => ({
    getCount: build.query<UserResponse, void>({
      query: () => ({
        url: ``,
      }),
      providesTags: ['Counter'],
    }),
  }),
});

export const { useGetCountQuery } = counterApi;
