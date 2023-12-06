import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://michii-81cc88ec4f95.herokuapp.com/api",
    prepareHeaders: async (headers) => {
      try {
        await Promise.resolve(); // Đảm bảo promise đã được giải quyết
        // const token = localStorage.getItem("token");
        // console.log("tokennn", token);
        // if (token) {
        //   headers.set("Authorization", `Bearer ${token}`);
        // }
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");

        return headers;
      } catch (error) {
        console.error("Error in prepareHeaders:", error);
        throw error;
      }
    },
  }),
  endpoints: (builder) => ({
    Signin: builder.mutation({
      query: (user) => ({
        url: `/login`,
        method: "POST",
        body: user,
      }),
      async transformResponse(response: any) {
        try {
          const token = response?.token; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
          const user = response?.user; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
          if (token) {
            localStorage.setItem("token", token); // Lưu token vào localStorage
          }
          localStorage.setItem("user", JSON.stringify(user));
          await Promise.resolve(); // Đảm bảo promise đã được giải quyết

          return response;
        } catch (error) {
          console.error("Error in transformResponse:", error);
          throw error;
        }
      },
    }),
    SigninGoogle: builder.mutation({
      query: (user) => ({
        url: `/loginGoogle`,
        method: "POST",
        body: user,
      }),
      async transformResponse(response: any) {
        try {
          const token = response?.token; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
          const user = response?.user; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
          if (token) {
            localStorage.setItem("token", token); // Lưu token vào localStorage
          }
          localStorage.setItem("user", JSON.stringify(user));
          await Promise.resolve(); // Đảm bảo promise đã được giải quyết

          return response;
        } catch (error) {
          console.error("Error in transformResponse:", error);
          throw error;
        }
      },
    }),
    Signup: builder.mutation({
      query: (user) => ({
        url: `/signup`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
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
  useSigninGoogleMutation
  // useSignupMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
