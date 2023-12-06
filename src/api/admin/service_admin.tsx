
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const service_AdminApi = createApi({
    reducerPath: 'service_admin',
    tagTypes: ['Service_admin'],
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
        getService_admin: builder.query<any, void>({
            query: () => `/services`,
            providesTags: ['Service_admin']
        }),
        getService_adminId: builder.query({
            query: (id) => `/service/${id}`,
            providesTags: ['Service_admin']
        }),
        addService_admin: builder.mutation({
            query: (product) => ({
                url: `/service`,
                method: "POST",
                body: product,
            }),
            invalidatesTags: ['Service_admin'],
        }),
        updateService_admin: builder.mutation({
            query: (product) => ({
                url: `/service/${product.get('id')}`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Service_admin']
        }),
        removeService_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/service/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Service_admin']
        }),
        changeStatusService_admin: builder.mutation({
            query: (body) => ({
                url: `/service/status`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['Service_admin']
        })
    })
})
export const {
    useAddService_adminMutation, useGetService_adminIdQuery, useGetService_adminQuery, useRemoveService_adminMutation, useUpdateService_adminMutation, useChangeStatusService_adminMutation
} = service_AdminApi;
export const service_AdminReducer = service_AdminApi.reducer;
export default service_AdminApi;