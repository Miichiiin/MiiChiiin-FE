
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const admin_admin_AdminApi = createApi({
    reducerPath: 'admin_admin_admin',
    tagTypes: ['Admin_admin1'],
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
        getAdmin_admin_Admin: builder.query({
            query: () => `/admin/admins`,
            providesTags: ['Admin_admin1']
        }),
        getAdmin_admin_AdminById: builder.query({
            query: (id) => `/admin/admin/${id}`,
            providesTags: ['Admin_admin1']
        }),
        addAdmin_admin_Admin: builder.mutation({
            query: (product) => ({
                url: `/admin/admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Admin_admin1']
        }),
        updateAdmin_admin_Admin: builder.mutation({
            query: (product) => ({
                url: `/admin/admin/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Admin_admin1']
        }),
        removeAdmin_admin_Admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/admin/admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Admin_admin1']
        }),
        changeStatusAdmin_admin_Admin: builder.mutation({
            query: (body) => ({
                url: `/admin/admin/status`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['Admin_admin1']
        })
    })
})
export const { 
  useAddAdmin_admin_AdminMutation, useGetAdmin_admin_AdminByIdQuery, useGetAdmin_admin_AdminQuery, useRemoveAdmin_admin_AdminMutation, useUpdateAdmin_admin_AdminMutation, useChangeStatusAdmin_admin_AdminMutation
 } = admin_admin_AdminApi;
export const Admin_admin_AdminReducer = admin_admin_AdminApi.reducer;
export default admin_admin_AdminApi;
