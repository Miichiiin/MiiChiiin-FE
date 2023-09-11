
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const services_adminApi = createApi({
    reducerPath: 'services_admin',
    tagTypes: ['Services_admin'],
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
        getServices_Admin: builder.query<any, void>({
            query: () => `/services_admin`,
            providesTags: ['Services_admin']
        }),
        getServices_AdminById: builder.query({
            query: (id) => `/services_admin/${id}`,
            providesTags: ['Services_admin']
        }),
        addServices_Admin: builder.mutation({
            query: (product) => ({
                url: `/services_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Services_admin']
        }),
        updateServices_Admin: builder.mutation({
            query: (product) => ({
                url: `/services_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Services_admin']
        }),
        removeServices_Admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/services_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Services_admin']
        })
    })
})
export const { 
    useAddServices_AdminMutation, useGetServices_AdminByIdQuery, useGetServices_AdminQuery, useRemoveServices_AdminMutation, useUpdateServices_AdminMutation
 } = services_adminApi;
export const services_AdminReducer = services_adminApi.reducer;
export default services_adminApi;
