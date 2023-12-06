
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  statisticalRoomTypeApi = createApi({
    reducerPath: 'statistical_roomtype',
    tagTypes: ['StatisticalRoomtype'],
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
        getStatisticalRoomtype: builder.query<any, { month: number, year: number,id:number }>({ 
            query: ({ month, year,id }) => `/statistical_rates_in_hotel/${id}/${month}/${year}`, // Sử dụng
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