import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUp } from "../../validation";
import DateAuth from "./DateAuth";
import GenderAuth from "./GenderAuth";
import { useAddUserMutation } from "../../feature/api/authApi";
import { BeatLoader } from "react-spinners";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  byear: new Date().getFullYear(),
  bmonth: new Date().getMonth() + 1,
  bday: new Date().getDate(),
  gender: "",
};

function RegistrationForm({ toast }) {
  const navigate = useNavigate();
  const [birthError, setBirthError] = useState("");
  const [addUser, { isLoading }] = useAddUserMutation();

  const registrationMutation = async () => {
    const singUpMutation = await addUser({
      fname: formik.values.fname,
      lname: formik.values.lname,
      email: formik.values.email,
      password: formik.values.password,
      byear: formik.values.byear,
      bmonth: formik.values.bmonth,
      bday: formik.values.bday,
      gender: formik.values.gender,
    });
    if (singUpMutation?.data?.message) {
      toast.success(singUpMutation?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      formik.resetForm();
      setBirthError("");
    } else if (singUpMutation?.error?.data?.message) {
      toast.error(singUpMutation?.error?.data?.message, {
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
    validationSchema: signUp,
    onSubmit: () => {
      const currentDate = new Date();
      const pickDate = new Date(
        formik.values.byear,
        formik.values.bmonth - 1,
        formik.values.bday
      );
      const eligibleYear = new Date(1970 + 18, 0, 1);
      const tooOldYear = new Date(1970 + 70, 0, 1);
      if (
        currentDate - pickDate < eligibleYear ||
        currentDate - pickDate > tooOldYear
      ) {
        return setBirthError("You're age must be between 18 to 70");
      }
      registrationMutation();
    },
  });
  const { errors, touched } = formik;
  let tempYears = new Date().getFullYear();
  let years = Array.from(new Array(105), (val, index) => tempYears - index);
  let months = Array.from(new Array(12), (val, index) => 1 + index);

  let day = () => {
    return new Date(formik.values.byear, formik.values.bmonth, 0).getDate();
  };
  let days = Array.from(new Array(day()), (val, index) => 1 + index);

  return (
    <div className="w-full sm:rounded-md sm:shadow-md sm:px-10 sm:py-7 box-border px-5 py-5">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="text-center sm:text-left mb-3 lg:mb-4">
          <input
            value={formik.values.fname}
            name="fname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            type="text"
            placeholder="First Name"
            className={
              errors.fname
                ? "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md focus:outline-none text-black bg-white"
                : "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md  focus:outline-none text-black bg-white"
            }
          />
          {errors.fname && touched.fname && (
            <p className="font-gilNormal text-sm text-red my-1">
              {errors.fname}
            </p>
          )}
        </div>
        <div className="text-center sm:text-left mb-3 lg:mb-4">
          <input
            name="lname"
            value={formik.values.lname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            type="text"
            placeholder="Lirst Name"
            className={
              errors.lname
                ? "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md focus:outline-none text-black bg-white"
                : "w-[75%] sm:w-full text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1 border-line_color border rounded-md  focus:outline-none text-black bg-white"
            }
          />
          {errors.lname && touched.lname && (
            <p className="font-gilNormal text-sm text-red my-1">
              {errors.lname}
            </p>
          )}
        </div>
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

        <GenderAuth formik={formik} errors={errors} touched={touched} />
        <DateAuth
          formik={formik}
          years={years}
          months={months}
          days={days}
          birthError={birthError}
        />

        <div className="flex sm:justify-between sm:items-start items-center flex-col sm:flex-row gap-y-5 sm:gap-y-0 mt-6 sm:mt-0">
          {isLoading ? (
            <button
              disabled
              type="submit"
              className="lg:px-6 lg:py-1 px-20 py-2 text-sm sm:text-base bg-black text-white rounded-xl shadow-md hover:bg-hove_color hover:text-black duration-500 font-gilBold">
              <BeatLoader color="white" size={8} />
            </button>
          ) : (
            <button
              type="submit"
              className="lg:px-6 lg:py-1 px-20 py-2 text-sm sm:text-base bg-black text-white rounded-xl shadow-md hover:bg-hove_color hover:text-black duration-500 font-gilBold">
              Submit
            </button>
          )}

          <div>
            <p className="font-gilLight text-sm sm:text-base text-black">
              Already have Account ?{" "}
              <Link
                to={"/login"}
                className="font-gilBold underline hover:decoration-2 text-yellow ">
                Sign In
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
