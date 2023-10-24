
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelchainstatisticRtApi = createApi({
    reducerPath: 'hotelchainstatisticrt',
    tagTypes: ['HotelChainStatisticRt'],
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
        getHotelChainStatisticRt: builder.query<any, void>({
            query: () => `/hotelchainstatisticrt`,
            providesTags: ['HotelChainStatisticRt']
        }),
        getHotelChainStatisticRtById: builder.query({
            query: (id) => `/hotelchainstatisticrt/${id}`,
            providesTags: ['HotelChainStatisticRt']
        }),
        addHotelChainStatisticRt: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatisticrt`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['HotelChainStatisticRt']
        }),
        updateHotelChainStatisticRt: builder.mutation({
            query: (product) => ({
                url: `/hotelchainstatisticrt/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['HotelChainStatisticRt']
        }),
        removeHotelChainStatisticRt: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/hotelchainstatisticrt/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['HotelChainStatisticRt']
        })
    })
})
export const { 
    useAddHotelChainStatisticRtMutation,useGetHotelChainStatisticRtByIdQuery,useGetHotelChainStatisticRtQuery,useRemoveHotelChainStatisticRtMutation,useUpdateHotelChainStatisticRtMutation
 } = hotelchainstatisticRtApi;
export const hotelchainstatisticRtReducer = hotelchainstatisticRtApi.reducer;
export default hotelchainstatisticRtApi;