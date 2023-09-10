
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const comfortApi = createApi({
    reducerPath: 'comfort',
    tagTypes: ['Comfort'],
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
        getComfort: builder.query({
            query: () => `/comfort`,
            providesTags: ['Comfort']
        }),
        getComfortById: builder.query({
            query: (id) => `/comfort/${id}`,
            providesTags: ['Comfort']
        }),
        addComfort: builder.mutation({
            query: (product) => ({
                url: `/comfort`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Comfort']
        }),
        updateComfort: builder.mutation({
            query: (product) => ({
                url: `/comfort/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Comfort']
        }),
        removeComfort: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/comfort/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Comfort']
        })
    })
})
export const { 
    useAddComfortMutation, useGetComfortByIdQuery, useGetComfortQuery, useRemoveComfortMutation, useUpdateComfortMutation
 } = comfortApi;
export const comfortReducer = comfortApi.reducer;
export default comfortApi;
