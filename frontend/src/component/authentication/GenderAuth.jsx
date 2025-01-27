import React from "react";

function GenderAuth({ formik, errors, touched }) {
  return (
    <>
      <div
        className={
          errors.gender
            ? "flex gap-x-3  items-center justify-center sm:justify-start"
            : "flex gap-x-3  items-center justify-center sm:justify-start"
        }>
        <input
          value={"male"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="radio"
          name="gender"
          id="male"
        />
        <label
          htmlFor="male"
          className="font-gilLight text-sm sm:text-base text-black">
          Male
        </label>
        <input
          value={"female"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="radio"
          name="gender"
          id="female"
        />
        <label
          htmlFor="female"
          className="font-gilLight text-sm sm:text-base text-black">
          Female
        </label>
      </div>
      {errors.gender && touched.gender && (
        <p className="font-gilNormal text-sm text-red text-center sm:text-left my-1">
          {errors.gender}
        </p>
      )}
    </>
  );
}

export default GenderAuth;
