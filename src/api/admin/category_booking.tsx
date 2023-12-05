import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const category_BookingApi = createApi({
    reducerPath: 'category_booking',
    tagTypes: ['Category_booking'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api",
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
                console.log(id.id_hotel);
                // Lấy ID khách sạn từ Local Storage
                return `/listRoom/hotels=${id.id_hotel}`;
            },
            providesTags: ['Category_booking']
        }),
        
    })
})
export const { 
 useGetCategory_BookingQuery
 } = category_BookingApi;
export const category_BookingReducer = category_BookingApi.reducer;
export default category_BookingApi;
