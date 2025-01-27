import React from "react";

function DateAuth({ formik, years, months, days, birthError }) {
  return (
    <>
      <div className="flex gap-x-1 sm:gap-x-3 my-4 justify-between">
        <select
          name="byear"
          value={formik.values.byear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          className="text-sm sm:text-base focus:outline-none font-gilLight w-[33%] border border-line_color p-1 rounded-sm shadow-md bg-white text-black">
          <option>Birth Year</option>
          {years.map((year, index) => (
            <option key={index}>{year}</option>
          ))}
        </select>
        <select
          name="bmonth"
          value={formik.values.bmonth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          className="text-sm sm:text-base focus:outline-none font-gilLight w-[33%] border border-line_color p-1 rounded-sm shadow-md bg-white text-black">
          <option>Birth Month</option>
          {months.map((month, index) => (
            <option key={index}>{month}</option>
          ))}
        </select>
        <select
          name="bday"
          value={formik.values.bday}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          className="text-sm sm:text-base focus:outline-none font-gilLight w-[33%] border border-line_color p-1 rounded-sm shadow-md bg-white text-black">
          <option>Birth Day </option>
          {days.map((day, index) => (
            <option key={index}>{day}</option>
          ))}
        </select>
      </div>
      {birthError && (
        <p className="font-gilNormal text-sm text-red text-center sm:text-left mb-3">
          {birthError}
        </p>
      )}
    </>
  );
}

export default DateAuth;
