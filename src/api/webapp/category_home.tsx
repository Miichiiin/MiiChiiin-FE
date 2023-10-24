
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_HomeApi = createApi({
    reducerPath: 'category_home',
    tagTypes: ['Category_home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCategory_home: builder.query<any, void>({
            query: () => {
                const id = JSON.parse(localStorage.getItem("userAdmin") || '{}');
                console.log(id.id_hotel);
                
                // Lấy ID khách sạn từ Local Storage
                return `/listRoom/hotels=${id.id_hotel}`;
            },
            providesTags: ['Category_home']
        }),
        getCategory_homeById: builder.query({
            query: (id) => `/category/${id}`,
            providesTags: ['Category_home']
        }),
        addCategory_home: builder.mutation({
            query: (product) => ({
                url: `/category`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_home']
        }),
        updateCategory_home: builder.mutation({
            query: (product) => ({
                url: `/category/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Category_home']
        }),
        removeCategory_home: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category_home']
        })
    })
})
export const { 
 useAddCategory_homeMutation, useGetCategory_homeByIdQuery, useGetCategory_homeQuery, useRemoveCategory_homeMutation, useUpdateCategory_homeMutation
 } = category_HomeApi;
export const category_HomeReducer = category_HomeApi.reducer;
export default category_HomeApi;
