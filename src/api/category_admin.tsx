
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_AdminApi = createApi({
    reducerPath: 'category_admin',
    tagTypes: ['Category_admin'],
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
        getCategory_admin: builder.query({
            query: () => `/category_admin`,
            providesTags: ['Category_admin']
        }),
        getCategory_adminById: builder.query({
            query: (id) => `/admin_admin/${id}`,
            providesTags: ['Category_admin']
        }),
        addCategory_admin: builder.mutation({
            query: (product) => ({
                url: `/category_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_admin']
        }),
        updateCategory_admin: builder.mutation({
            query: (product) => ({
                url: `/category_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Category_admin']
        }),
        removeCategory_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/category_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category_admin']
        })
    })
})
export const { 
 useAddCategory_adminMutation, useGetCategory_adminByIdQuery, useGetCategory_adminQuery, useRemoveCategory_adminMutation, useUpdateCategory_adminMutation
 } = category_AdminApi;
export const category_AdminReducer = category_AdminApi.reducer;
export default category_AdminApi;
