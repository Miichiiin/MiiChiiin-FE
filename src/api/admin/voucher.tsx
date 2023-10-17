
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const voucherApi = createApi({
    reducerPath: 'voucher',
    tagTypes: ['Voucher'],
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
        getVoucher: builder.query<any, void>({
            query: () => `/vouchers`,
            providesTags: ['Voucher']
        }),
        getVoucherById: builder.query({
            query: (id) => `/vouchers/${id}`,
            providesTags: ['Voucher']
        }),
        addVoucher: builder.mutation({
            query: (product) => ({
                url: `/vouchers`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Voucher']
        }),
        updateVoucher: builder.mutation({
            query: (product) => ({
                url: `/vouchers/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Voucher']
        }),
        removeVoucher: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/vouchers/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Voucher']
        })
    })
})
export const { 
 useAddVoucherMutation, useGetVoucherByIdQuery, useGetVoucherQuery, useRemoveVoucherMutation, useUpdateVoucherMutation
 } = voucherApi;
export const voucherReducer = voucherApi.reducer;
export default voucherApi;
