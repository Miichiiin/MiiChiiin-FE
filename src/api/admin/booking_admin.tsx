
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const booking_AdminApi = createApi({
    reducerPath: 'booking_admin',
    tagTypes: ['Booking_admin'],
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
        getBooking_admin: builder.query({
            query: () => `/bookings`,
            providesTags: ['Booking_admin']
        }),
        getBooking_adminById: builder.query({
            query: (id) => `/booking/${id}`,
            providesTags: ['Booking_admin']
        }),
        addBooking_admin: builder.mutation({
            query: (product) => ({
                url: `/booking`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Booking_admin']
        }),
        updateBooking_admin: builder.mutation({
            query: (product) => ({
                url: `/booking/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Booking_admin']
        }),
        removeBooking_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/booking/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Booking_admin']
        })
    })
})
export const { 
   useAddBooking_adminMutation, useGetBooking_adminByIdQuery, useGetBooking_adminQuery, useRemoveBooking_adminMutation, useUpdateBooking_adminMutation
 } = booking_AdminApi;
export const booking_AdminReducer = booking_AdminApi.reducer;
export default booking_AdminApi;
