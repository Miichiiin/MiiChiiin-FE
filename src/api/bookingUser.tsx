
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const bookingUserApi = createApi({
    reducerPath: 'bookingUser',
    tagTypes: ['BookingUser'],
    baseQuery: fetchBaseQuery({
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
        getBokingUser: builder.query({
            query: (id) => `/booking/${id}`,
            providesTags: ['BookingUser']
        }),
        getBookingDetailUser: builder.query<any,void>({
            query: (id) => `/bookingDetail/${id}`,
            providesTags: ['BookingUser']
        }),
    })
})
export const { 
 useGetBokingUserQuery, useGetBookingDetailUserQuery
 } = bookingUserApi;
export const bookingUserReducer = bookingUserApi.reducer;
export default bookingUserApi;
