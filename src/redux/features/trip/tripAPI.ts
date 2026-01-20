import baseAPI from "@/redux/api/api";

const tripAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchTrips: build.query({
      query: (tripId) => ({
        url: `/admin/trips/${tripId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchTripsQuery } = tripAPI;
export default tripAPI;
