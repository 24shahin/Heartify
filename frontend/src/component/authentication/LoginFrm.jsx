import { useFormik } from "formik";
import React from "react";
import { signIn } from "../../validation";
import { Link, useNavigate } from "react-router-dom";
import { useLogedInUserMutation } from "../../feature/api/authApi";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { LogedInUser } from "../../feature/userSlices/authSlice";

const initialState = {
  email: "",
  password: "",
};

function LoginFrm({ toast }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [logedInUser, { isLoading }] = useLogedInUserMutation();
  const LoginUser = async () => {
    const LoginMutation = await logedInUser({
      email: formik.values.email,
      password: formik.values.password,
    });
    if (LoginMutation?.data?.message) {
      toast.success(LoginMutation?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
      const { message, ...rest } = LoginMutation?.data;
      localStorage.setItem("user", JSON.stringify(rest));

      dispatch(LogedInUser(rest));
      navigate("/");
      formik.resetForm();
    } else if (LoginMutation?.error?.data?.message) {
      toast.error(LoginMutation?.error?.data?.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signIn,
    onSubmit: () => {
      LoginUser();
    },
  });
  const { errors, touched } = formik;
  return (
    <div className="w-full sm:rounded-md sm:shadow-md sm:px-10 sm:py-7 box-border px-5 py-5">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="text-center sm:text-left mb-3 lg:mb-4">
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            type="email"
            placeholder="example@gmail.com"
            className={
              errors.email
                ? "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md focus:outline-none text-black bg-white"
                : "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md  focus:outline-none text-black bg-white"
            }
          />
          {errors.email && touched.email && (
            <p className="font-gilNormal text-sm text-red my-1">
              {errors.email}
            </p>
          )}
        </div>
        <div className="text-center sm:text-left mb-3 lg:mb-4">
          <input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            type="password"
            placeholder="Password"
            className={
              errors.password
                ? "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md focus:outline-none text-black bg-white"
                : "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md  focus:outline-none text-black bg-white"
            }
          />
          {errors.password && touched.password && (
            <p className="font-gilNormal text-sm text-red my-1">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex sm:justify-between sm:items-start items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 mt-6 sm:mt-0">
          <div>
            {isLoading ? (
              <button
                disabled
                type="submit"
                className="lg:px-6 lg:py-1 px-20 py-2 text-sm sm:text-base bg-black text-white rounded-xl shadow-md hover:bg-hove_color hover:text-black duration-500 font-gilBold">
                <BeatLoader color="#fff" size={8} />
              </button>
            ) : (
              <button
                type="submit"
                className="lg:px-6 lg:py-1 px-20 py-2 text-sm sm:text-base bg-black text-white rounded-xl shadow-md hover:bg-hove_color hover:text-black duration-500 font-gilBold">
                Login
              </button>
            )}
          </div>

          <div>
            <p className="font-gilLight text-sm sm:text-base text-black">
              Dont't have an Account ?
              <Link
                to={"/registration"}
                className="font-gilBold underline hover:decoration-2 text-yellow ">
                {" "}
                Sign Up
              </Link>{" "}
              here
            </p>
            <p className="font-gilLight text-sm sm:text-base text-black">
              Forgot Password ?
              <Link
                to={"/forget"}
                className="font-gilBold underline hover:decoration-2 text-green ">
                {" "}
                Click
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFrm;
