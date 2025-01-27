import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { code } from "../../validation";
import { useMatchResetCodeMutation } from "../../feature/api/authApi";
import { SyncLoader } from "react-spinners";

function VerificationCode({
  setVisibleComponent,
  foundUser,
  setSuccess,
  suceess,
  setError,
  error,
}) {
  const [matchResetCode, { isLoading }] = useMatchResetCodeMutation();

  const initialState = {
    code: "",
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: code,
    onSubmit: () => {
      handlematchCode();
    },
  });

  const handlematchCode = async () => {
    try {
      let match = await matchResetCode({
        email: foundUser.email,
        code: formik.values.code,
      });

      if (match?.data?.message === "Great ! Your code matched") {
        setSuccess(match?.data?.message);
        setError("");
        setTimeout(() => {
          setSuccess("");
          setVisibleComponent(3);
        }, 3000);
      } else {
        setError(match?.data?.message);
      }
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  const { errors, touched } = formik;
  return (
    <div className="bg-white w-[520px] min-w-[320px] rounded-md px-8 py-4">
      <p className="font-gilBold text-base text-black border-b border-line_color pb-3">
        Enter Verification code
      </p>
      <p className="font-gilMedium text-base text-tittle_color mt-3 mb-6 ">
        Please enter your verification code to reset your account password
      </p>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Enter your Code"
          className="px-3 py-1 border border-line_color focus:outline-none w-full rounded-sm bg-white text-black"
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.code}
        />
        {errors.code && touched.code && (
          <p className="text-base font-gilNormal text-red mt-3">
            {errors.code}
          </p>
        )}
        {suceess && (
          <p className="text-base font-gilNormal text-green mt-3">{suceess}</p>
        )}
        {error && (
          <p className="text-base font-gilNormal text-red mt-3">{error}</p>
        )}
        <div className="flex justify-between mt-4">
          {isLoading ? (
            <button
              className="block px-4 py-1 bg-green text-common-white rounded-sm font-gilNormal text-base"
              type="submit"
              disabled={true}>
              <SyncLoader speedMultiplier={0.8} size={8} />
            </button>
          ) : (
            <button
              className="block px-4 py-1 bg-green text-common-white rounded-sm font-gilNormal text-base"
              type="submit"
              onClick={handlematchCode}>
              Submit
            </button>
          )}
          <Link
            to={"/login"}
            className="block px-4 py-1 bg-red text-common-white rounded-sm font-gilNormal text-base">
            Cancle
          </Link>
        </div>
      </form>
    </div>
  );
}

export default VerificationCode;
