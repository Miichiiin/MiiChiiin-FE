
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath: 'users',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        
        Signin: builder.mutation({
            query: (user) => ({
                url: `/signin`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        Signup: builder.mutation({
            query: (user) => ({
                url: `/signup`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Users']
        }),

        getUsers: builder.query({
            query: () => `/users`,
            providesTags: ['Users']
        }),
        
    })
})
export const { 
    useGetUsersQuery,
    useSigninMutation,
    useSignupMutation,
    
 } = authApi;
export const authReducer = authApi.reducer;
export default authApi;
