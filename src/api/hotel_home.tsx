
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotel_HomeApi = createApi({
    reducerPath: 'hotel_home',
    tagTypes: ['Hotel_home'],
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
        getHotel_homes: builder.query<any, void>({
            query: () => `/hotel_home`,
            providesTags: ['Hotel_home']
        }),
        getHotel_homeById: builder.query({
            query: (id) => `/hotel_home/${id}`,
            providesTags: ['Hotel_home']
        }),
        addHotel_home: builder.mutation({
            query: (product) => ({
                url: `/hotel_home`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Hotel_home']
        }),
        updateHotel_home: builder.mutation({
            query: (product) => ({
                url: `/hotel_home/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Hotel_home']
        }),
        removeHotel_home: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/hotel_home/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Hotel_home']
        })
    })
})
export const { 
   useAddHotel_homeMutation, useGetHotel_homeByIdQuery, useGetHotel_homesQuery, useRemoveHotel_homeMutation, useUpdateHotel_homeMutation
 } = hotel_HomeApi;
export const hotel_HomeReducer = hotel_HomeApi.reducer;
export default hotel_HomeApi;
