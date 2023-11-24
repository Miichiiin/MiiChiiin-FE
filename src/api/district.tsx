
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const districtApi = createApi({
    reducerPath: 'district',
    tagTypes: ['District'],
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
        getDistrict: builder.query({
            query: () => `/district`,
            providesTags: ['District']
        }),
        getDistrictById: builder.query({
            query: (id) => `/district/${id}`,
            providesTags: ['District']
        }),
        addDistrict: builder.mutation({
            query: (product) => ({
                url: `/district`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['District']
        }),
        updateDistrict: builder.mutation({
            query: (product) => ({
                url: `/district/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['District']
        }),
        removeDistrict: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/district/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['District']
        })
    })
})
export const { 
    useAddDistrictMutation, useGetDistrictByIdQuery, useGetDistrictQuery, useRemoveDistrictMutation, useUpdateDistrictMutation
 } = districtApi;
export const districtReducer = districtApi.reducer;
export default districtApi;
