
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const room_adminApi = createApi({
    reducerPath: 'room_admin',
    tagTypes: ['Room_admin'],
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
        getRoom_Admins: builder.query({
            query: () => `/room_admin`,
            providesTags: ['Room_admin']
        }),
        getRoom_AdminById: builder.query({
            query: (id) => `/room_admin/${id}`,
            providesTags: ['Room_admin']
        }),
        addRoom_Admin: builder.mutation({
            query: (product) => ({
                url: `/room_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Room_admin']
        }),
        updateRoom_Admin: builder.mutation({
            query: (product) => ({
                url: `/room_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Room_admin']
        }),
        removeRoom_Admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/room_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Room_admin']
        })
    })
})
export const { 
    useAddRoom_AdminMutation, useGetRoom_AdminByIdQuery, useGetRoom_AdminsQuery, useRemoveRoom_AdminMutation, useUpdateRoom_AdminMutation
 } = room_adminApi;
export const room_AdminReducer = room_adminApi.reducer;
export default room_adminApi;
