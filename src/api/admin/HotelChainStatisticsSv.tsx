
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelchainstatisticsvApi = createApi({
    reducerPath: 'hotelchainstatisticsv',
    tagTypes: ['HotelChainStatisticSv'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getHotelChainStatisticsv: builder.query<any,{month: number, year: number}>({
            query: ({month, year}) => `statistical_services_inchain/${month}/${year}`,
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