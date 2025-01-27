import React, { useState } from "react";
import { useReVerificationMutation } from "../../../feature/api/authApi";

function ReAuth({ userInfo }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [reVerification] = useReVerificationMutation();
  const handleReVerification = async () => {
    try {
      const resend = await reVerification(userInfo.token).unwrap();
      setSuccess(resend.message);
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  return (
    <>
      <div className="w-full p-5 shadow-md bg-white rounded-md">
        <h4 className="font-gilNormal text-base text-black">
          You're Account is not Activate/Verified. Please Active/Verify your
          Account with an hour before get trouble
        </h4>
        <button
          onClick={handleReVerification}
          className="text-blue font-gilMedium text-base hover:underline">
          Get The Activity/Verifing Code
        </button>
        {success && (
          <p className="text-base font-gilNormal text-green">{success}</p>
        )}
        {error && <p className="text-base font-gilNormal text-red">{error}</p>}
      </div>
    </>
  );
}

export default ReAuth;
