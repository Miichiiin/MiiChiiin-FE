
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const role1Api = createApi({
    reducerPath: 'roles1_admin',
    tagTypes: ['Role1'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getRoles1: builder.query({
            query: () => `/roles`,
            providesTags: ['Role1']
        }),
        getRole1ById: builder.query({
            query: (id) => `/role/${id}`,
            providesTags: ['Role1']
        }),
        addRole1: builder.mutation({
            query: (product) => ({
                url: `/role`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Role1']
        }),
        updateRole1: builder.mutation({
            query: (product) => ({
                url: `/role/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Role1']
        }),
        removeRole1: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/role/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Role1']
        })
    })
})
export const { 
    useGetRoles1Query,useGetRole1ByIdQuery,useUpdateRole1Mutation,useAddRole1Mutation,useRemoveRole1Mutation
 } = role1Api;
export const role1Reducer = role1Api.reducer;
export default role1Api;
