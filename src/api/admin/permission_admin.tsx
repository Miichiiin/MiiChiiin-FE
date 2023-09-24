
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const permissionApi = createApi({
    reducerPath: 'permission_admin',
    tagTypes: ['Permission'],
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
        getPermissions: builder.query({
            query: () => `/permission_admin`,
            providesTags: ['Permission']
        }),
        getPermissionById: builder.query({
            query: (id) => `/permission_admin/${id}`,
            providesTags: ['Permission']
        }),
        addPermission: builder.mutation({
            query: (product) => ({
                url: `/permission_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Permission']
        }),
        updatePermission: builder.mutation({
            query: (product) => ({
                url: `/permission_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Permission']
        }),
        removePermission: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/permission_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Permission']
        })
    })
})
export const { 
    useGetPermissionsQuery,useGetPermissionByIdQuery,useUpdatePermissionMutation,useAddPermissionMutation,useRemovePermissionMutation
 } = permissionApi;
export const permissionReducer = permissionApi.reducer;
export default permissionApi;
