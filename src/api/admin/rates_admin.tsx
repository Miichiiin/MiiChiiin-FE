
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ratingApi = createApi({
    reducerPath: 'rating',
    tagTypes: ['Rating'],
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
        getRating: builder.query({
            query: () => `/rates_admin`,
            providesTags: ['Rating']
        }),
        getRatingById: builder.query({
            query: (id) => `/rates_admin/${id}`,
            providesTags: ['Rating']
        }),
        addRating: builder.mutation({
            query: (product) => ({
                url: `/rates_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Rating']
        }),
        updateRating: builder.mutation({
            query: (product) => ({
                url: `/rates_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Rating']
        }),
        removeRating: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/rates_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Rating']
        })
    })
})
export const { 
    useAddRatingMutation, useGetRatingByIdQuery, useGetRatingQuery, useRemoveRatingMutation, useUpdateRatingMutation
 } = ratingApi;
export const ratingReducer = ratingApi.reducer;
export default ratingApi;
