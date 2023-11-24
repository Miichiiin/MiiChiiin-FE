
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rating_HomeApi = createApi({
    reducerPath: 'rating_home',
    tagTypes: ['Rating_home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/comment",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getRating_home: builder.query({
            query: (id) => `/id_cate=${id}`,
            providesTags: ['Rating_home']
        }),
        getRatingById: builder.query({
            query: (id) => `/rate/${id}`,
            providesTags: ['Rating_home']
        }),
        addRating: builder.mutation({
            query: (product) => ({
                url: `/rate`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Rating_home']
        }),
        updateRating: builder.mutation({
            query: (product) => ({
                url: `/rate/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Rating_home']
        }),
        removeRating: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/rate/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Rating_home']
        })
    })
})
export const { 
    useAddRatingMutation, useGetRatingByIdQuery, useGetRating_homeQuery, useRemoveRatingMutation, useUpdateRatingMutation
 } = rating_HomeApi;
export const rating_HomeReducer = rating_HomeApi.reducer;
export default rating_HomeApi;
