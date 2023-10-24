
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  statisticalRoomTypeApi = createApi({
    reducerPath: 'statistical_roomtype',
    tagTypes: ['StatisticalRoomtype'],
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
        getStatisticalRoomtype: builder.query<any, void>({
            query: () => `/statistical_roomtype`,
            providesTags: ['StatisticalRoomtype']
        }),
        getStatisticalByIdRoomtype: builder.query({
            query: (id) => `/statistical_roomtype/${id}`,
            providesTags: ['StatisticalRoomtype']
        }),
        addStatisticalRoomtype: builder.mutation({
            query: (product) => ({
                url: `/statistical`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['StatisticalRoomtype']
        }),
        updateStatisticalRoomtype: builder.mutation({
            query: (product) => ({
                url: `/statistical_roomtype/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['StatisticalRoomtype']
        }),
        removeStatisticalRoomtype: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/statistical_roomtype/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['StatisticalRoomtype']
        })
    })
})
export const { 
    useAddStatisticalRoomtypeMutation,useGetStatisticalByIdRoomtypeQuery,useGetStatisticalRoomtypeQuery,useRemoveStatisticalRoomtypeMutation,useUpdateStatisticalRoomtypeMutation
 } = statisticalRoomTypeApi;
export const statisticalRoomTypeReducer = statisticalRoomTypeApi.reducer;
export default statisticalRoomTypeApi;