
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelchainstatisticsApi = createApi({
    reducerPath: 'hotelchainstatistics',
    tagTypes: ['HotelChainStatistics'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getHotelChainStatistics: builder.query<any, { month: number, year: number }>({
            query: ({ month, year }) => `statictical_total_booking_monthl/${month}/${year}`,
            providesTags: ['HotelChainStatistics'],
          }),
        getHotelChainStatisticsById: builder.query({
            query: (id) => `/hotelchainstatistics/${id}`,
            providesTags: ['HotelChainStatistics']
        }),
        addHotelChainStatistics: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatistics`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['HotelChainStatistics']
        }),
        updateHotelChainStatistics: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatistics/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['HotelChainStatistics']
        }),
        removeHotelChainStatistics: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/hotelchainstatistics/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['HotelChainStatistics']
        })
    })
})
export const { 
useAddHotelChainStatisticsMutation,useGetHotelChainStatisticsByIdQuery,useGetHotelChainStatisticsQuery,useRemoveHotelChainStatisticsMutation,useUpdateHotelChainStatisticsMutation
 } = hotelchainstatisticsApi;
export const hotelchainstatisticsReducer = hotelchainstatisticsApi.reducer;
export default hotelchainstatisticsApi;