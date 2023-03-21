import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi", // name of the slice
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography"], // represent the state of which you can identify a particular data. When we grab the user the tag identification value is user
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers/",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search}) => ({
                url: "client/transactions",
                method: "GET",
                params: {page, pageSize, sort, search},
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        })
    })
})

export const  {
    useGetUserQuery, // the way this value "use" as prefix and "Query" as suffix
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery
} = api;