
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const room_adminApi = createApi({
    reducerPath: 'room_admin',
    tagTypes: ['Room_admin'],
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
        getRoom_Admins: builder.query({
            query: () => `/rooms`,
            providesTags: ['Room_admin']
        }),
        getRoom_AdminById: builder.query({
            query: (id) => `/room/${id}`,
            providesTags: ['Room_admin']
        }),
        addRoom_Admin: builder.mutation({
            query: (product) => ({
                url: `/room`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Room_admin']
        }),
        updateRoom_Admin: builder.mutation({
            query: (product) => ({
                url: `/room/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Room_admin']
        }),
        removeRoom_Admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/room/${id}`,
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
