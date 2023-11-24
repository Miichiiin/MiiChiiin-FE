
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
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
        getUsers: builder.query({
            query: () => `/khachhang`,
            providesTags: ['Users']
        }),
        getUserId: builder.query({
            query: (id) => `/khachhang/${id}`,
            providesTags: ['Users']
        }),
        addUser: builder.mutation<any,any>({
            query: (product) => ({
                url: `/khachhang`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation({
            query: (product) => ({
                url: `/khachhang/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Users']
        }),
        removeUser: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/khachhang/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users']
        })
    })
})
export const { 
 useAddUserMutation, useGetUserIdQuery, useGetUsersQuery, useRemoveUserMutation, useUpdateUserMutation
 } = userApi;
export const useReducer = userApi.reducer;
export default userApi;
