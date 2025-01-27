import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordChangeMutation } from "../../feature/api/authApi";
import { SyncLoader } from "react-spinners";
import { password } from "../../validation";

function Newpassword({ foundUser, setSuccess, suceess, setError, error }) {
  const [passwordChange, { isLoading }] = usePasswordChangeMutation();
  const initialState = {
    password: "",
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: password,
    onSubmit: () => {
      handleResetPassword();
    },
  });
  const handleResetPassword = async () => {
    let changePassword = await passwordChange({
      email: foundUser.email,
      password: formik.values.password,
    }).unwrap();
    setSuccess(changePassword.message);
    setTimeout(() => {
      navigate("/login");
      setError("");
      setSuccess("");
    }, 3000);

    try {
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  const { errors, touched } = formik;
  return (
    <div className="bg-white w-[520px] min-w-[320px] rounded-md px-8 py-4">
      <p className="font-gilBold text-base text-black border-b border-line_color pb-3">
        Enter New Password
      </p>
      <p className="font-gilMedium text-base text-tittle_color mt-3 mb-6 ">
        Please enter your New and Strong password
      </p>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Make A Strong Password"
          className="px-3 py-1 border border-line_color focus:outline-none w-full rounded-sm"
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {errors.password && touched.password && (
          <p className="text-base font-gilNormal text-red mt-3">
            {errors.password}
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
              className="block px-4 py-1 bg-green text-white rounded-sm font-gilNormal text-base"
              type="submit"
              disabled={true}
            >
              <SyncLoader speedMultiplier={0.8} size={8} />
            </button>
          ) : (
            <button
              className="block px-4 py-1 bg-green text-white rounded-sm font-gilNormal text-base"
              type="submit"
              onClick={handleResetPassword}
            >
              Submit
            </button>
          )}
          <Link
            to={"/login"}
            className="block px-4 py-1 bg-red text-white rounded-sm font-gilNormal text-base"
          >
            Cancle
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Newpassword;
