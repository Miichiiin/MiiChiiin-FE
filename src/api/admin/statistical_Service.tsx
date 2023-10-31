
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  statistical_ServiceApi = createApi({
    reducerPath: 'statistical_service',
    tagTypes: ['StatisticalService'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStatisticalService: builder.query<any,{month:number, year:number}>({
            query: ({month,year}) => `statistical_services/${month}/${year}/1`,
            providesTags: ['StatisticalService']
        }),
        getStatisticalByIdService: builder.query({
            query: (id) => `/statistical_service/${id}`,
            providesTags: ['StatisticalService']
        }),
        addStatisticalService: builder.mutation({
            query: (product) => ({
                url: `/statistical`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['StatisticalService']
        }),
        updateStatisticalService: builder.mutation({
            query: (product) => ({
                url: `/statistical_service/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['StatisticalService']
        }),
        removeStatisticalService: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/vouchers/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['StatisticalService']
        })
    })
})
export const { 
  useGetStatisticalServiceQuery,useAddStatisticalServiceMutation,useGetStatisticalByIdServiceQuery,useRemoveStatisticalServiceMutation,useUpdateStatisticalServiceMutation
 } = statistical_ServiceApi;
export const statisticalServiceReducer = statistical_ServiceApi.reducer;
export default statistical_ServiceApi;