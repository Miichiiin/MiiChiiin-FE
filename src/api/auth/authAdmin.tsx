import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authAdminApi = createApi({
  reducerPath: "userAdmin",
  tagTypes: ["UserAdmin"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/auth/admin",
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Signin: builder.mutation({
      query: (userAdmin) => ({
        url: `/login`,
        method: "POST",
        body: userAdmin,
      }),
      transformResponse: (response: any) => {
        console.log("res",response.userAdmin);
        
        const token = response.token; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
        const userAdmin = response.admin; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
        if (token) {
          localStorage.setItem("token", token); // Lưu token vào localStorage
        }
        localStorage.setItem("userAdmin",JSON.stringify(userAdmin))
        return response;
      },
      
      invalidatesTags: ["UserAdmin"],
      
    }),
  }),
});
export const {
  useSigninMutation,
} = authAdminApi;
export const authAdminReducer = authAdminApi.reducer;
export default authAdminApi;