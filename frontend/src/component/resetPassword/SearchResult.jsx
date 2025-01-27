import React from "react";
import { Link } from "react-router-dom";
import { useSendcodeMutation } from "../../feature/api/authApi";
import { SyncLoader } from "react-spinners";

function SearchResult({
  setVisibleComponent,
  foundUser,
  setSuccess,
  suceess,
  setError,
  error,
}) {
  const [Sendcode, { isLoading }] = useSendcodeMutation();

  const handlesendCode = async () => {
    try {
      let result = await Sendcode(foundUser.email).unwrap();
      setSuccess(result.message);
      setTimeout(() => {
        setSuccess("");
        setError("");
        setVisibleComponent(2);
      }, 3000);
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  return (
    <div className="bg-white w-[520px] min-w-[320px] rounded-md px-8 py-4">
      <p className="font-gilBold text-base text-black border-b border-line_color pb-3">
        Search Result
      </p>
      <p className="font-gilMedium text-base text-tittle_color mt-3 mb-6 ">
        How do you wnat to receive the code to reset your password?
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3 w-7/12">
          <input type="radio" defaultChecked={true} />
          <span className="block text-base font-gilNormal text-black">
            {foundUser.email}
          </span>
        </div>
        <div className=" w-5/12 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary_bg mx-auto mb-3">
            <img
              src={foundUser.profilePicture}
              alt=""
              className="w-full h-full rounded-full bg-cover"
            />
          </div>
          <p className="text-base text-black font-gilNormal">
            {foundUser.username}
          </p>
        </div>
      </div>
      {suceess && (
        <p className="text-base font-gilNormal text-green text-center">
          {suceess}
        </p>
      )}
      {error && (
        <p className="text-base font-gilNormal text-red text-center">{error}</p>
      )}

      <div className="flex justify-between mt-4">
        {isLoading ? (
          <button
            className="block px-4 py-1 bg-green text-white rounded-sm font-gilNormal text-base"
            type="submit"
            disabled={true}>
            <SyncLoader speedMultiplier={0.8} size={8} color="white" />
          </button>
        ) : (
          <button
            className="block px-4 py-1 bg-green text-common-white rounded-sm font-gilNormal text-base"
            type="submit"
            onClick={handlesendCode}>
            Continue
          </button>
        )}
        <Link
          to={"/login"}
          className="block px-4 py-1 bg-red text-common-white rounded-sm font-gilNormal text-base">
          Not You ?
        </Link>
      </div>
    </div>
  );
}

export default SearchResult;
