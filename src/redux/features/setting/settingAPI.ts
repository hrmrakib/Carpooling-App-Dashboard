import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/profile/edit",
        method: "PATCH",
        body,
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/profile/change-password",
        method: "POST",
        body,
      }),
    }),

    updateContext: builder.mutation({
      query: (body) => ({
        url: "/admin/context-pages/modify",
        method: "POST",
        body,
      }),
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/context-pages/privacy-policy`,
        method: "GET",
      }),
    }),

    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/context-pages/terms`,
        method: "GET",
      }),
    }),

    getAboutUs: builder.query({
      query: () => ({
        url: `/context-pages/about-us`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateContextMutation,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useGetAboutUsQuery,
} = userAPI;

export default userAPI;
