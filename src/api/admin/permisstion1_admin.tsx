
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const permission1Api = createApi({
    reducerPath: 'permission1_admin',
    tagTypes: ['Permission'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPermissions1: builder.query({
            query: () => `/permissions`,
            providesTags: ['Permission']
        }),
        getPermission1ById: builder.query({
            query: (id) => `/permissions/${id}`,
            providesTags: ['Permission']
        }),
        addPermission1: builder.mutation({
            query: (product) => ({
                url: `/permissions`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Permission']
        }),
        updatePermission1: builder.mutation({
            query: (product) => ({
                url: `/permissions/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Permission']
        }),
        removePermission1: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/permissions/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Permission']
        })
    })
})
export const { 
    useGetPermissions1Query,useGetPermission1ByIdQuery,useUpdatePermission1Mutation,useAddPermission1Mutation,useRemovePermission1Mutation
 } = permission1Api;
export const permission1Reducer = permission1Api.reducer;
export default permission1Api;
