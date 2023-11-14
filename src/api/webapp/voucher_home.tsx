import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const voucher_HotelApi = createApi({
    reducerPath: 'voucher_hotel',
    tagTypes: ['Voucher_hotel'],
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
        getVoucher_hotel: builder.query<any,void>({
            query: () => `/profile/voucher`,
            providesTags: ['Voucher_hotel']
        }),
        getVoucher_hotelId: builder.query<any,{ id: number}>({
            query: ({id}) => `/profile/${id}/voucher`,
            providesTags: ['Voucher_hotel']
        }),
        addVoucher_hotel: builder.mutation({
            query: (product) => ({
                url: `/service_of_hotel`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Voucher_hotel']
        }),
        updateVoucher_hotel: builder.mutation({
            query: (product) => ({
                url: `/service_of_hotel/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Voucher_hotel']
        }),
        removeService_hotel: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/service_of_hotel/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Voucher_hotel']
        })
    })
})
export const { 
 useAddVoucher_hotelMutation,useGetVoucher_hotelIdQuery,useGetVoucher_hotelQuery,useRemoveService_hotelMutation,useUpdateVoucher_hotelMutation
 } = voucher_HotelApi;
export const voucher_Reducer = voucher_HotelApi.reducer;
export default voucher_HotelApi;