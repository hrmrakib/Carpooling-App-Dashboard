import baseAPI from "@/redux/api/api";

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `/admin/user-activities`,
    }),

    toggleNotifications: builder.mutation({
      query: (data) => ({
        url: `/admin/user-activities`,
        method: "POST",
        body: data,
      }),
    }),

    deleteNotification: builder.mutation({
      query: (data) => ({
        url: `/admin/user-activities`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useToggleNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationAPI;
export default notificationAPI;
