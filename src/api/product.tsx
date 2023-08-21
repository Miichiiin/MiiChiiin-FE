
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
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
        getProducts: builder.query({
            query: () => `/products`,
            providesTags: ['Product']
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: `/products`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        })
    })
})
export const { 
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useUpdateProductMutation
 } = productApi;
export const productReducer = productApi.reducer;
export default productApi;
