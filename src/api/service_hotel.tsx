
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const service_HotelApi = createApi({
    reducerPath: 'service_hotel',
    tagTypes: ['Service_hotel'],
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
        getService_hotel: builder.query({
            query: () => `/service_of_hotel`,
            providesTags: ['Service_hotel']
        }),
        getService_hotelId: builder.query({
            query: (id) => `/service_of_hotel/${id}`,
            providesTags: ['Service_hotel']
        }),
        addService_hotel: builder.mutation({
            query: (product) => ({
                url: `/service_of_hotel`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Service_hotel']
        }),
        updateService_hotel: builder.mutation({
            query: (product) => ({
                url: `/service_of_hotel/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Service_hotel']
        }),
        removeService_hotel: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/service_of_hotel/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Service_hotel']
        })
    })
})
export const { 
 useAddService_hotelMutation, useGetService_hotelIdQuery, useGetService_hotelQuery, useRemoveService_hotelMutation, useUpdateService_hotelMutation
 } = service_HotelApi;
export const service_Reducer = service_HotelApi.reducer;
export default service_HotelApi;
