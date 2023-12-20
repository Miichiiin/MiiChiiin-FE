import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_BookingApi = createApi({
    reducerPath: 'category_booking',
    tagTypes: ['Category_booking'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCategory_Booking: builder.query<any, void>({
            query: () => {
                const id = JSON.parse(localStorage.getItem("userAdmin") || '{}');
                // Lấy ID khách sạn từ Local Storage
                return `/find/hotels=${id.id_hotel}/2023-12-20/2023-12-23`;
            },
            providesTags: ['Category_booking']
        }),
        getService_Booking: builder.query<any, void>({
            query: () => {
                const id = JSON.parse(localStorage.getItem("userAdmin") || '{}');
                // Lấy ID khách sạn từ Local Storage
                return `/services/id_hotel=${id.id_hotel}`;
            },
            providesTags: ['Category_booking']
        }),

    })
})
export const {
    useGetCategory_BookingQuery, useGetService_BookingQuery
} = category_BookingApi;
export const category_BookingReducer = category_BookingApi.reducer;
export default category_BookingApi;
