import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const category_HotelApi = createApi({
  reducerPath: "category_hotel",
  tagTypes: ["Category_hotel"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders(headers) {
      // const token = localStorage.getItem("token");
      // if (token) {
      //     headers.set('Authorization', `Bearer ${token}`)
      // }
      // return headers;
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: (builder) => ({
    getCategory_hotel: builder.query<any, any>({
      query: () => `/rooms_hethong`,
      providesTags: ["Category_hotel"],
    }),
    
  }),
});
export const {
    useGetCategory_hotelQuery
} = category_HotelApi;
export const category_HotelReducer = category_HotelApi.reducer;
export default category_HotelApi;
