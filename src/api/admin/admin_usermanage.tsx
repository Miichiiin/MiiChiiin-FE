import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const user_AdminApi = createApi({
    reducerPath: 'user_admin',
    tagTypes: ['User_admin'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUsers_admin: builder.query({
            query: () => `/users`,
            providesTags: ['User_admin']
        }),
        getUser_adminById: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ['User_admin']
        }),
        addUser_admin: builder.mutation<any,any>({
            query: (product) => ({
                url: `/user`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['User_admin']
        }),
        updateUser_admin: builder.mutation({
            query: (product) => ({
                url: `/user/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['User_admin']
        }),
        removeUser_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['User_admin']
        })
    })
})
export const {
    useAddUser_adminMutation, useGetUser_adminByIdQuery, useGetUsers_adminQuery, useRemoveUser_adminMutation, useUpdateUser_adminMutation
} = user_AdminApi;
export const user_AdminReducer = user_AdminApi.reducer;
export default user_AdminApi;