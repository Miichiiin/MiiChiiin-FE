import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_AdminApi = createApi({
    reducerPath: 'category_admin',
    tagTypes: ['Category_admin'],
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
        getCategory_admin: builder.query<any, void>({
            query: () => `/categories`,
            providesTags: ['Category_admin']
        }),
        getCategory_adminById: builder.query({
            query: (id) => `/category/${id}`,
            providesTags: ['Category_admin']
        }),
        addCategory_admin: builder.mutation({
            query: (product) => ({
                url: `/category`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_admin']
        }),
        updateCategory_admin: builder.mutation({
            query: (product) => ({
                url: `/category/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_admin']
        }),
        removeCategory_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/category/${id}`,
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
