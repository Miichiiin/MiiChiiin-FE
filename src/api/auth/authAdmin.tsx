import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authAdminApi = createApi({
  reducerPath: "userAdmin",
  tagTypes: ["UserAdmin"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://miichi-76a7860e9869.herokuapp.com/api/auth/admin",
    prepareHeaders: async (headers) => {
      try {
        await Promise.resolve(); // Đảm bảo promise đã được giải quyết
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");

        return headers;
      } catch (error) {
        console.error("Error in prepareHeaders:", error);
        throw error;
      }
    }
  }),
  endpoints: (builder) => ({
    Signin: builder.mutation({
      query: (userAdmin) => ({
        url: `/login`,
        method: "POST",
        body: userAdmin,
      }),
      // async transformResponse(response: any) {
      //   console.log("res",response.admin);
        
      //   try {
      //     const tokenAdmin = response?.token; // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
      //     const userAdmin = response?.admin;
      //     localStorage.setItem("userAdmin", JSON.stringify(userAdmin)); // Giả sử token được trả về trong phản hồi là một thuộc tính 'token'
      //     if (tokenAdmin) {
      //       localStorage.setItem("tokenAdmin", tokenAdmin); // Lưu token vào localStorage
      //     }
      //     await Promise.resolve(); // Đảm bảo promise đã được giải quyết

      //     return response;
      //   } catch (error) {
      //     console.error("Error in transformResponse:", error);
      //     throw error;
      //   }
      // },
      invalidatesTags: ["UserAdmin"],
      
    }),
  }),
});
export const {
  useSigninMutation,
} = authAdminApi;
export const authAdminReducer = authAdminApi.reducer;
export default authAdminApi;