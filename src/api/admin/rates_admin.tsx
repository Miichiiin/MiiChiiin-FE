
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
            query: () => `/rating`,
            providesTags: ['Rating']
        }),
        getRatingById: builder.query({
            query: (id) => `/rating/${id}`,
            providesTags: ['Rating']
        }),
        addRating: builder.mutation({
            query: (product) => ({
                url: `/rating`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Rating']
        }),
        updateRating: builder.mutation({
            query: (product) => ({
                url: `/rating/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Rating']
        }),
        removeRating: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/rating/${id}`,
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
