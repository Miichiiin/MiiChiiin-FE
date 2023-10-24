
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const service_HotelApi = createApi({
    reducerPath: 'service_hotel',
    tagTypes: ['Service_hotel'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getService_hotel: builder.query<any,void>({
            query: () => `/services`,
            providesTags: ['Service_hotel']
        }),
        getService_hotelId: builder.query({
            query: (id) => `/service/${id}`,
            providesTags: ['Service_hotel']
        }),
        addService_hotel: builder.mutation({
            query: (product) => ({
                url: `/service`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Service_hotel']
        }),
        updateService_hotel: builder.mutation({
            query: (product) => ({
                url: `/service/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Service_hotel']
        }),
        removeService_hotel: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/service/${id}`,
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