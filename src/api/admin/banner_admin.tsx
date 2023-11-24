
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const banner_AdminApi = createApi({
    reducerPath: 'banner_admin',
    tagTypes: ['Banner_admin'],
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
        getBanner_admin: builder.query({
            query: () => `/banner_admin`,
            providesTags: ['Banner_admin']
        }),
        getBanner_adminById: builder.query({
            query: (id) => `/banner_admin/${id}`,
            providesTags: ['Banner_admin']
        }),
        addBanner_admin: builder.mutation({
            query: (product) => ({
                url: `/banner_admin`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Banner_admin']
        }),
        updateBanner_admin: builder.mutation({
            query: (product) => ({
                url: `/banner_admin/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Banner_admin']
        }),
        removeBanner_admin: builder.mutation<void, number | string>({
            query: (id: number) => ({
                url: `/banner_admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Banner_admin']
        })
    })
})
export const { 
   useAddBanner_adminMutation, useGetBanner_adminByIdQuery, useGetBanner_adminQuery, useRemoveBanner_adminMutation, useUpdateBanner_adminMutation
 } = banner_AdminApi;
export const banner_AdminReducer = banner_AdminApi.reducer;
export default banner_AdminApi;
