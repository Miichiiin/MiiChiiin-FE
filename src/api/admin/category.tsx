import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_Api = createApi({
    reducerPath: 'category_admin1',
    tagTypes: ['Category_admin1'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCategory_admin1: builder.query({
            query: () => {
                return `/categories`;
            },
            providesTags: ['Category_admin1']
        }),
        getCategory_adminById1: builder.query({
            query: (id) => `/category/${id}`,
            providesTags: ['Category_admin1']
        }),
        addCategory_admin1: builder.mutation({
            query: (product) => ({
                url: `/category`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_admin1']
        }),
        updateCategory_admin1: builder.mutation({
            query: (product) => ({
                url: `/category/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_admin1']
        }),
        removeCategory_admin1: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category_admin1']
        })
    })
})
export const { 
 useAddCategory_admin1Mutation, useGetCategory_adminById1Query, useGetCategory_admin1Query, useRemoveCategory_admin1Mutation, useUpdateCategory_admin1Mutation
 } = category_Api;
export const category_Reducer = category_Api.reducer;
export default category_Api;
