
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const voucherApi = createApi({
    reducerPath: 'voucher',
    tagTypes: ['Voucher'],
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
        getVoucher: builder.query<any, void>({
            query: () => `/vouchers`,
            providesTags: ['Voucher']
        }),
        getVoucherById: builder.query({
            query: (id) => `/voucher/${id}`,
            providesTags: ['Voucher']
        }),
        addVoucher: builder.mutation({
            query: (product) => ({
                url: `/voucher`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Voucher']
        }),
        updateVoucher: builder.mutation({
            query: (product) => ({
                url: `/voucher/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Voucher']
        }),
        removeVoucher: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/voucher/${id}`,
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
