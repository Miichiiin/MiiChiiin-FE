
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rating_Hotel_HomeApi = createApi({
    reducerPath: 'rating_hotel_home',
    tagTypes: ['Rating_hotel_home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api/comment",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        useGetRating_hotel_homeQuery: builder.query({
            query: (id) => `/id_hotel=${id}`,
            providesTags: ['Rating_hotel_home']
        }),
        getRatingById: builder.query({
            query: (id) => `/rate/${id}`,
            providesTags: ['Rating_hotel_home']
        }),
        addRating: builder.mutation({
            query: (product) => ({
                url: `/rate`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Rating_hotel_home']
        }),
        updateRating: builder.mutation({
            query: (product) => ({
                url: `/rate/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Rating_hotel_home']
        }),
        removeRating: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/rate/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Rating_hotel_home']
        })
    })
})
export const { 
    useAddRatingMutation, useGetRatingByIdQuery, useUseGetRating_hotel_homeQueryQuery, useRemoveRatingMutation, useUpdateRatingMutation
 } = rating_Hotel_HomeApi;
export const rating_hotel_HomeReducer = rating_Hotel_HomeApi.reducer;
export default rating_Hotel_HomeApi;
