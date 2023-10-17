
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelchainstatisticsvApi = createApi({
    reducerPath: 'hotelchainstatisticsv',
    tagTypes: ['HotelChainStatisticSv'],
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
        getHotelChainStatisticsv: builder.query<any, void>({
            query: () => `/hotelchainstatisticsv`,
            providesTags: ['HotelChainStatisticSv']
        }),
        getHotelChainStatisticsvById: builder.query({
            query: (id) => `/hotelchainstatisticsv/${id}`,
            providesTags: ['HotelChainStatisticSv']
        }),
        addHotelChainStatisticsv: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatisticsv`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['HotelChainStatisticSv']
        }),
        updateHotelChainStatisticsv: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatisticsv/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['HotelChainStatisticSv']
        }),
        removeHotelChainStatisticsv: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/hotelchainstatisticsv/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['HotelChainStatisticSv']
        })
    })
})
export const { 
useAddHotelChainStatisticsvMutation,useGetHotelChainStatisticsvByIdQuery,useGetHotelChainStatisticsvQuery,useRemoveHotelChainStatisticsvMutation,useUpdateHotelChainStatisticsvMutation
 } = hotelchainstatisticsvApi;
export const hotelchainstatisticsvReducer = hotelchainstatisticsvApi.reducer;
export default hotelchainstatisticsvApi;