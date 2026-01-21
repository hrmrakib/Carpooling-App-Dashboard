import baseAPI from "@/redux/api/api";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/send_otp/",
        method: "POST",
        body,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/verify_email/",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = AuthenticationAPI;
export default AuthenticationAPI;
