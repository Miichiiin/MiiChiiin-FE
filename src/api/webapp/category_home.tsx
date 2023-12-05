import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const category_HomeApi = createApi({
    reducerPath: 'category_home',
    tagTypes: ['Category_home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api",
        prepareHeaders(headers) {
            // const token = localStorage.getItem("token");
            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`)
            // }
            // return headers;
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
        }
    }),
    endpoints: (builder) => ({
        getCategory_home: builder.query<any, any>({
            query: (id) => `/cateRoom/hotel=${id}`,
            providesTags: ['Category_home']
        }),
        getCategory_homeById: builder.query<any,any>({
        query: (hotel) => `/find/hotels=${hotel.id}/${hotel.check_in}/${hotel.check_out}/${hotel?.number_people}/${hotel?.total_room}`,
            providesTags: ['Category_home']
        }),
        addCategory_home: builder.mutation({
            query: (product) => ({
                url: `/category_home`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category_home']
        }),
        getCategory_detail: builder.query<any, any>({
            query: (product) => `/cateRoom/${product.id}/hotel=${product.id_hotel}`,
            providesTags: ['Category_home']
        }),
        updateCategory_home: builder.mutation({
            query: (product) => ({
                url: `/category_home/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Category_home']
        }),
        removeCategory_home: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/category_home/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category_home']
        })
    })
})
export const { 
 useAddCategory_homeMutation, useGetCategory_homeByIdQuery, useGetCategory_homeQuery, useRemoveCategory_homeMutation, useUpdateCategory_homeMutation,useGetCategory_detailQuery
 } = category_HomeApi;
export const category_HomeReducer = category_HomeApi.reducer;
export default category_HomeApi;