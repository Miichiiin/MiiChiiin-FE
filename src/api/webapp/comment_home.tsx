
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rate_HomeApi = createApi({
    reducerPath: 'rate_home',
    tagTypes: ['Comment_home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getRate_home: builder.query<any, void>({
            query: () => `/admin/rates`,
            providesTags: ['Comment_home']
        }),
        getRate_homeById: builder.query({
            query: (id) => `/admin/rate/${id}`,
            providesTags: ['Comment_home']
        }),
        addRate_home: builder.mutation({
            query: (product) => ({
                url: `/rate`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Comment_home']
        }),
        // updateCategory_home: builder.mutation({
        //     query: (product) => ({
        //         url: `/category_home/${product.id}`,
        //         method: "PATCH",
        //         body: product
        //     }),
        //     invalidatesTags: ['Comment_home']
        // }),
        // removeCategory_home: builder.mutation<void, number | string>({
        //     query: (id: number) => ({
        //         url: `/category_home/${id}`,
        //         method: "DELETE"
        //     }),
        //     invalidatesTags: ['Comment_home']
        // })
    })
})
export const { 
 useAddRate_homeMutation, useGetRate_homeByIdQuery, useGetRate_homeQuery
 } = rate_HomeApi;
export const rate_HomeReducer = rate_HomeApi.reducer;
export default rate_HomeApi;
