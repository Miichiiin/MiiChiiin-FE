
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ratingApi = createApi({
    reducerPath: 'rating',
    tagTypes: ['Rating'],
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
        getRating: builder.query({
            query: () => `/rates`,
            providesTags: ['Rating']
        }),
        getRatingById: builder.query({
            query: (id) => `/rate/${id}`,
            providesTags: ['Rating']
        }),
        addRating: builder.mutation({
            query: (product) => ({
                url: `/rate`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Rating']
        }),
        updateRating: builder.mutation({
            query: (product) => ({
                url: `/rate/${product.id}`,
                method: "PUT",
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
