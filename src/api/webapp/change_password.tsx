
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const change_PasswordApi = createApi({
    reducerPath: 'change_password',
    tagTypes: ['Change_password'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders(headers) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        
        change_password: builder.mutation({
            query: (product) => ({
                url: `/change_password`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Change_password']
        }),
        forget_password: builder.mutation({
            query: (product) => ({
                url: `/forget_password`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Change_password']
        }),
        
    })
})
export const { 
 useChange_passwordMutation,useForget_passwordMutation
 } =  change_PasswordApi;
export const change_PasswordReducer =  change_PasswordApi.reducer;
export default change_PasswordApi;
