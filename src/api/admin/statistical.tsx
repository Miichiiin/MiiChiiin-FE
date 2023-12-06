
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const statisticalApi = createApi({
    reducerPath: 'statistical',
    tagTypes: ['Statistical'],
    baseQuery: fetchBaseQuery({

        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStatistical: builder.query<any, { id: number, year: number }>({ 
            query: ({ id, year }) => `/statictical_total_booking_month_in_hotel/${id}/${year}`, 
            providesTags: ['Statistical'],
          }),
        getStatisticalById: builder.query({
            query: (id) => `/statistical/${id}`,
            providesTags: ['Statistical']
        }),
        addStatistical: builder.mutation({
            query: (product) => ({
                url: `/statistical`,
                method: "GET",
                body: product
            }),
            invalidatesTags: ['Statistical']
        }),
        updateStatistical: builder.mutation({
            query: (product) => ({
                url: `/vouchers/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Statistical']
        }),
        removeStatistical: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/vouchers/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Statistical']
        })
    })
})
export const { 
 useAddStatisticalMutation,useGetStatisticalByIdQuery, useGetStatisticalQuery,useRemoveStatisticalMutation
 } = statisticalApi;
export const statisticalReducer = statisticalApi.reducer;
export default statisticalApi;