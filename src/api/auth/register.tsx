import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const registerApi = createApi({
  reducerPath: "register",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
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
    },
  }),
  endpoints: (builder) => ({
    Signup: builder.mutation({
      query: (user) => ({
        url: `/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

  }),
});
export const {
  useSignupMutation,
} = registerApi;
export const registerReducer = registerApi.reducer;
export default registerApi;
