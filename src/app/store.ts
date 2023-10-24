
import admin_AdminApi, { Admin_AdminReducer } from '@/api/admin/admin_admin';
import banner_AdminApi, { banner_AdminReducer } from '@/api/admin/banner_admin';
import booking_AdminApi, { booking_AdminReducer } from '@/api/admin/booking_admin';
import category_AdminApi, { category_AdminReducer } from '@/api/admin/category_admin';
import category_HomeApi, { category_HomeReducer } from '@/api/webapp/category_home';
import comfortApi, { comfortReducer } from '@/api/admin/comfort_admin';
import districtApi, { districtReducer } from '@/api/district';
import hotel_AdminApi, { hotel_AdminReducer } from '@/api/admin/hotel_admin';
import hotel_HomeApi, { hotel_HomeReducer } from '@/api/webapp/hotel_home';
import room_adminApi, { room_AdminReducer } from '@/api/admin/room_admin';
import services_adminApi, { services_AdminReducer } from '@/api/admin/service_admin';
import service_HotelApi, { service_Reducer } from '@/api/webapp/service_hotel';
import { sliceReducer } from '@/api/searchSlice';
import userApi, { useReducer } from '@/api/users';
import voucherApi, { voucherReducer } from '@/api/admin/voucher';
import { combineReducers, configureStore } from '@reduxjs/toolkit';


import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import ratingApi, { ratingReducer } from '@/api/admin/rates_admin';
import { cartReducer } from '@/api/cartSlice';
import roleApi, { roleReducer } from '@/api/admin/role_admin';
import permissionApi, { permissionReducer } from '@/api/admin/permission_admin';
// import middlewares from 'json-server-auth';
import bookingUserApi, { bookingUserReducer } from '@/api/bookingUser';
import statisticalApi, { statisticalReducer } from '@/api/admin/statistical';
import statistical_ServiceApi, { statisticalServiceReducer } from '@/api/admin/statistical_Service';
import hotelchainstatisticsApi, { hotelchainstatisticsReducer } from '@/api/admin/HotelChainStatistics';
import hotelchainstatisticsvApi, { hotelchainstatisticsvReducer } from '@/api/admin/HotelChainStatisticsSv';
import admin_admin_AdminApi, { Admin_admin_AdminReducer } from '@/api/admin/admin_admin_admin';
import role1Api, { role1Reducer } from '@/api/admin/role1_admin';
import permission1Api, { permission1Reducer } from '@/api/admin/permisstion1_admin';
import admin_AdminApi1, { Admin_AdminReducer1 } from '@/api/admin/admin_admin1';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['product']
}

const rootReducer = combineReducers({
    room_admin: room_AdminReducer,
    services_admin: services_AdminReducer,
    hotel_admin: hotel_AdminReducer,
    banner_admin: banner_AdminReducer,
    admin_admin: Admin_AdminReducer,
    category_admin: category_AdminReducer,
    booking_admin: booking_AdminReducer,
    voucher: voucherReducer,
    district: districtReducer,
    comfort: comfortReducer,
    users: useReducer,
    service_hotel: service_Reducer,
    category_home: category_HomeReducer,
    hotel_home: hotel_HomeReducer,
    cart: cartReducer,
    rating: ratingReducer,
    searchSlice: sliceReducer,
    roles_admin : roleReducer,
    permission_admin: permissionReducer,
    bookingUser: bookingUserReducer,
    statistical:statisticalReducer,
    statistical_service: statisticalServiceReducer,
    hotelchainstatistics: hotelchainstatisticsReducer,
    hotelchainstatisticsv: hotelchainstatisticsvReducer,
    admin_admin_admin: Admin_admin_AdminReducer,
    roles1_admin: role1Reducer,
    permission1_admin: permission1Reducer,
    admin_admin1: Admin_AdminReducer1,
})
const middleware = [
    room_adminApi.middleware, 
    services_adminApi.middleware,
    hotel_AdminApi.middleware,
    banner_AdminApi.middleware,
    admin_AdminApi.middleware,
    category_AdminApi.middleware,
    booking_AdminApi.middleware,
    voucherApi.middleware,
    districtApi.middleware,
    comfortApi.middleware,
    userApi.middleware,
    service_HotelApi.middleware,
    category_HomeApi.middleware,
    hotel_HomeApi.middleware,
    ratingApi.middleware,
    roleApi.middleware,
    permissionApi.middleware,
    bookingUserApi.middleware,
    statisticalApi.middleware,
    statistical_ServiceApi.middleware,
    hotelchainstatisticsApi.middleware,
    hotelchainstatisticsvApi.middleware,
    admin_admin_AdminApi.middleware,
    role1Api.middleware,
    permission1Api.middleware,
    admin_AdminApi1.middleware
]

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }) .concat(...middleware),
    })
       
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore(store);
