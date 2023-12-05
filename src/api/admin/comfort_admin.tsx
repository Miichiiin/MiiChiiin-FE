
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const comfortApi = createApi({
    reducerPath: 'comfort',
    tagTypes: ['Comfort'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getComfort: builder.query({
            query: () => `/comforts`,
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
                method: "PUT",
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
        }),
        changeStatusComfort: builder.mutation({
            query: (body) => ({
                url: `/comfort/status`,
                method: "POST",
                body:body
            }),
            invalidatesTags: ['Comfort']
        })
    })
})
export const { 
    useAddComfortMutation, useGetComfortByIdQuery, useGetComfortQuery, useRemoveComfortMutation, useUpdateComfortMutation, useChangeStatusComfortMutation
 } = comfortApi;
export const comfortReducer = comfortApi.reducer;
export default comfortApi;
