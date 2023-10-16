import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Signin: builder.mutation({
      query: (user) => ({
        url: `/login`,
        method: "POST",
        body: user,
      }),
      transformResponse: (response: any) => {
        console.log("res",response.user);
        
        const token = response.token; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
        const user = response.user; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
        if (token) {
          localStorage.setItem("token", token); // Lưu token vào localStorage
        }
        localStorage.setItem("user",JSON.stringify(user))
        return response;
      },
      
      invalidatesTags: ["Users"],
      
    }),
    Signup: builder.mutation({
        query: (user) => ({
            url: `/signup`,
            method: "POST",
            body: user
        }),
        invalidatesTags: ['Users']
    }),

    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useSigninMutation,
  // useSignupMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
