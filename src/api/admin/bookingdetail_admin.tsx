
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const bookingDetail_AdminApi = createApi({
    reducerPath: 'bookingDetail_admin',
    tagTypes: ['BookingDetail_admin'],
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
        getBookingDetail_admin: builder.query({
            query: () => `/bookingdetail`,
            providesTags: ['BookingDetail_admin']
        }),
        getBookingDetail_adminById: builder.query({
            query: (id) => `/bookingdetail/${id}`,
            providesTags: ['BookingDetail_admin']
        }),
        addBookingDetail_admin: builder.mutation({
            query: (product) => ({
                url: `/bookingdetail`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingDetail_admin']
        }),
        updateBookingDetail_admin: builder.mutation({
            query: (product) => ({
                url: `/bookingdetail/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['BookingDetail_admin']
        }),
        removeBookingDetail_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/bookingdetail/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['BookingDetail_admin']
        })
    })
})
export const {
    useAddBookingDetail_adminMutation, useGetBookingDetail_adminByIdQuery, useGetBookingDetail_adminQuery, useRemoveBookingDetail_adminMutation, useUpdateBookingDetail_adminMutation
} = bookingDetail_AdminApi;
export const bookingDetail_AdminReducer = bookingDetail_AdminApi.reducer;
export default bookingDetail_AdminApi;