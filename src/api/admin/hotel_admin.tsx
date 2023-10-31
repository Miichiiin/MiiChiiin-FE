
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotel_AdminApi = createApi({
    reducerPath: 'hotel_admin',
    tagTypes: ['Hotel_admin'],
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
        getHotel_admins: builder.query({
            query: () => `/hotels`,
            providesTags: ['Hotel_admin']
        }),
        getHotel_adminById: builder.query({
            query: (id) => `/hotel/${id}`,
            providesTags: ['Hotel_admin']
        }),
        addHotel_admin: builder.mutation({
            query: (product) => ({
                url: `/hotel`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Hotel_admin']
        }),
        updateHotel_admin: builder.mutation({
            query: (product) => ({
                url: `/hotel/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Hotel_admin']
        }),
        removeHotel_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/hotel/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Hotel_admin']
        })
    })
})
export const { 
   useAddHotel_adminMutation, useGetHotel_adminByIdQuery, useGetHotel_adminsQuery, useRemoveHotel_adminMutation, useUpdateHotel_adminMutation
 } = hotel_AdminApi;
export const hotel_AdminReducer = hotel_AdminApi.reducer;
export default hotel_AdminApi;
