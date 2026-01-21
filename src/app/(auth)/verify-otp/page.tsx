import OtpVerifyContent from "@/components/auth/OtpVerifyContent";
import { Suspense } from "react";

const VerifyOtpPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OtpVerifyContent />
      </Suspense>
    </>
  );
};

export default VerifyOtpPage;
