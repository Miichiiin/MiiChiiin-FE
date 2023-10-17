
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelchainstatisticsApi = createApi({
    reducerPath: 'hotelchainstatistics',
    tagTypes: ['HotelChainStatistics'],
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
        getHotelChainStatistics: builder.query<any, void>({
            query: () => `/hotelchainstatistics`,
            providesTags: ['HotelChainStatistics']
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