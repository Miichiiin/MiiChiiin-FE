
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const roleApi = createApi({
    reducerPath: 'roles_admin',
    tagTypes: ['Role'],
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
        getRoles: builder.query({
            query: () => `/roles_admin`,
            providesTags: ['Role']
        }),
        getRoleById: builder.query({
            query: (id) => `/roles_admin/${id}`,
            providesTags: ['Role']
        }),
        addRole: builder.mutation({
            query: (product) => ({
                url: `/roles_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Role']
        }),
        updateRole: builder.mutation({
            query: (product) => ({
                url: `/roles_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Role']
        }),
        removeRole: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/roles_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Role']
        })
    })
})
export const { 
    useGetRolesQuery,useGetRoleByIdQuery,useUpdateRoleMutation,useAddRoleMutation,useRemoveRoleMutation
 } = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
