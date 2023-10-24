
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const admin_AdminApi1 = createApi({
    reducerPath: 'admin_admin1',
    tagTypes: ['Admin_admin1'],
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
        getAdmin_Admin1: builder.query({
            query: () => `/admin`,
            providesTags: ['Admin_admin1']
        }),
        getAdmin_AdminById1: builder.query({
            query: (id) => `/admin/${id}`,
            providesTags: ['Admin_admin1']
        }),
        addAdmin_Admin1: builder.mutation({
            query: (product) => ({
                url: `/admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Admin_admin1']
        }),
        updateAdmin_Admin1: builder.mutation({
            query: (product) => ({
                url: `/admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Admin_admin1']
        }),
        removeAdmin_Admin1: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Admin_admin1']
        })
    })
})
export const { 
  useAddAdmin_Admin1Mutation, useGetAdmin_AdminById1Query, useGetAdmin_Admin1Query, useRemoveAdmin_Admin1Mutation, useUpdateAdmin_Admin1Mutation
 } = admin_AdminApi1;
export const Admin_AdminReducer1 = admin_AdminApi1.reducer;
export default admin_AdminApi1;
