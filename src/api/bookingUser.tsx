
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const bookingUserApi = createApi({
    reducerPath: 'bookingUser',
    tagTypes: ['BookingUser'],
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3000",
        baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getBokingUser: builder.query<any,any>({
            query: (id) => `/profile/${id}/booking`,
            providesTags: ['BookingUser']
        }),
        getBookingDetailUser: builder.query<any,any>({
            query: (id_detail) => `/profile/${id_detail.id_user}/booking/${id_detail.id_booking}`,
            providesTags: ['BookingUser']
        }),
        getSearchOrder: builder.query<any,any>({
            query: (slug) => `/profile/booking/${slug}`,
            providesTags: ['BookingUser']
        }),
        addBookingUser: builder.mutation<any,any>({
            query: (product) => ({
                url: `/create_booking`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['BookingUser']
        }),
        getBokingUserTest: builder.query<any[], any>({
            query: () => `/bookingTest`,
            providesTags: ['BookingUser']
        }),
    })

})
export const { 
 useGetBokingUserQuery, useGetBookingDetailUserQuery, useAddBookingUserMutation, useGetBokingUserTestQuery, useGetSearchOrderQuery
 } = bookingUserApi;
export const bookingUserReducer = bookingUserApi.reducer;
export default bookingUserApi;
