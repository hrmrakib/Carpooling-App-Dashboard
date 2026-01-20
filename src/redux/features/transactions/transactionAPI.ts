import baseAPI from "@/redux/api/api";

const transectionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTransactionsQuery } = transectionAPI;
export default transectionAPI;
