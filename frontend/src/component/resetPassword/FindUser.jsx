import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { findUser } from "../../validation";
import { useSearchUserMutation } from "../../feature/api/authApi";
import { SyncLoader } from "react-spinners";

const initialState = {
  email: "",
};
function FindUser({ setError, setFoundUser, error, setVisibleComponent }) {
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: findUser,
    onSubmit: () => {
      serachUser();
    },
  });
  const [searchUser, { isLoading }] = useSearchUserMutation();
  const serachUser = async () => {
    try {
      let result = await searchUser(formik.values.email).unwrap();
      setFoundUser(result);
      setVisibleComponent(1);
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  const { errors, touched } = formik;
  return (
    <div className="bg-white w-[520px] min-w-[320px] rounded-md px-8 py-4">
      <p className="font-gilBold text-base text-black border-b border-line_color pb-3">
        Find Your Account
      </p>
      <p className="font-gilMedium text-base text-tittle_color mt-3 mb-6 ">
        Please enter your Email/Number to find your account
      </p>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          type="email"
          placeholder="example@gmail.com"
          className="px-3 py-1 border border-line_color focus:outline-none w-full rounded-sm text-black bg-white"
        />
        {errors.email && touched.email && (
          <p className="text-base font-gilNormal text-red mt-3">
            {errors.email}
          </p>
        )}
        {error && (
          <p className="text-base font-gilNormal text-red mt-3">{error}</p>
        )}
        <div className="flex justify-between mt-4">
          {isLoading ? (
            <button
              className="block px-4 py-1 bg-green text-white rounded-sm font-gilNormal text-base"
              type="submit"
              disabled={true}>
              <SyncLoader speedMultiplier={0.8} size={8} color="#fff" />
            </button>
          ) : (
            <button
              className="block px-4 py-1 bg-green text-common-white rounded-sm font-gilNormal text-base"
              type="submit">
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

export default FindUser;
