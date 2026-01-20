import baseAPI from "@/redux/api/api";

const overviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchOverviewData: build.query({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchOverviewDataQuery } = overviewAPI;
export default overviewAPI;
