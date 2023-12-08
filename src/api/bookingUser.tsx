
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const bookingUserApi = createApi({
    reducerPath: 'bookingUser',
    tagTypes: ['BookingUser'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getBokingUser: builder.query<any, any>({
            query: (id) => `/profile/${id}/booking`,
            providesTags: ['BookingUser']
        }),
        getBookingDetailUser: builder.query<any, any>({
            query: (id_detail) => `/profile/${id_detail.id_user}/booking/${id_detail.id_booking}`,
            providesTags: ['BookingUser']
        }),
        getSearchOrder: builder.query<any, any>({
            query: (slug) => `/profile/booking/${slug}`,
            providesTags: ['BookingUser']
        }),
        addBookingUser: builder.mutation<any, any>({
            query: (product) => ({
                url: `/create_booking`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        likeDetailRoom: builder.mutation<any, any>({
            query: (product) => ({
                url: `/likes/${product}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        viewDetailRoom: builder.mutation<any, any>({
            query: (product) => ({
                url: `/views/${product}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        findBooking: builder.mutation<any, any>({
            query: (product) => ({
                url: `/user/find_booking`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        getStatusBookings: builder.mutation({
            query: (product) => ({
                url: `/booking/status`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        getorderBookings: builder.query<any, any>({
            query: (slug) => `/booking/slug=${slug}`,
            providesTags: ['BookingUser']
        })
    })

})
export const {
    useGetBokingUserQuery, useGetBookingDetailUserQuery, useAddBookingUserMutation, useFindBookingMutation, useGetSearchOrderQuery, useLikeDetailRoomMutation, useViewDetailRoomMutation, useGetStatusBookingsMutation, useGetorderBookingsQuery
} = bookingUserApi;
export const bookingUserReducer = bookingUserApi.reducer;
export default bookingUserApi;
