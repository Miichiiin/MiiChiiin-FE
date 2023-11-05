
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const admin_AdminApi = createApi({
    reducerPath: 'admin_admin',
    tagTypes: ['Admin_admin'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAdmin_Admin: builder.query({
            query: () => `/admin_admin`,
            providesTags: ['Admin_admin']
        }),
        getAdmin_AdminById: builder.query({
            query: (id) => `/admin_admin/${id}`,
            providesTags: ['Admin_admin']
        }),
        addAdmin_Admin: builder.mutation({
            query: (product) => ({
                url: `/admin_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Admin_admin']
        }),
        updateAdmin_Admin: builder.mutation({
            query: (product) => ({
                url: `/admin_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Admin_admin']
        }),
        removeAdmin_Admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/admin_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Admin_admin']
        })
    })
})
export const { 
  useAddAdmin_AdminMutation, useGetAdmin_AdminByIdQuery, useGetAdmin_AdminQuery, useRemoveAdmin_AdminMutation, useUpdateAdmin_AdminMutation
 } = admin_AdminApi;
export const Admin_AdminReducer = admin_AdminApi.reducer;
export default admin_AdminApi;
