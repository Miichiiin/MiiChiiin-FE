
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  statistical_ServiceApi = createApi({
    reducerPath: 'statistical_service',
    tagTypes: ['StatisticalService'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api/admin",
        prepareHeaders(headers) {
            const token = localStorage.getItem("tokenAdmin");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getStatisticalService: builder.query<any,{month:number, year:number,id:number}>({
            query: ({month,year,id}) => `statistical_services/${month}/${year}/${id}`,
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