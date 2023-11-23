import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const voucherApi = createApi({
  reducerPath: "voucher",
  tagTypes: ["Voucher"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders(headers) {
      const token = localStorage.getItem("tokenAdmin");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVoucher: builder.query<any, void>({
      query: () => `/admin/vouchers`,
      providesTags: ["Voucher"],
    }),
    getVoucherById: builder.query({
      query: (id) => `/admin/voucher/${id}`,
      providesTags: ["Voucher"],
    }),
    addVoucher: builder.mutation({
      query: (product) => ({
        url: `/admin/voucher`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Voucher"],
    }),
    updateVoucher: builder.mutation({
      query: (product) => ({
        url: `/admin/voucher/${product.get("id")}`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Voucher"],
    }),
    removeVoucher: builder.mutation<void, number | string>({
      query: (id: number) => ({
        url: `/admin/voucher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
    phatVoucher: builder.mutation({
      query: (product) => ({
        url: `/voucher/wallet/add_voucher`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});
export const {
  useAddVoucherMutation,
  useGetVoucherByIdQuery,
  useGetVoucherQuery,
  useRemoveVoucherMutation,
  useUpdateVoucherMutation,
  usePhatVoucherMutation,
} = voucherApi;
export const voucherReducer = voucherApi.reducer;
export default voucherApi;
