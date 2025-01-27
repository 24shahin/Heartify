import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CenterPart from "../../component/HomeComponent/CenterPart/CenterPart";
import Active from "./Active";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEmailVarifiedUserMutation } from "../../feature/api/authApi";
import { LogedInUser } from "../../feature/userSlices/authSlice";

function ActivatePage() {
  const [EmailVarifiedUser] = useEmailVarifiedUserMutation();
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    activeUser();
  }, []);

  const activeUser = async () => {
    setLoading(true); // Show loading state initially
    try {
      const result = await EmailVarifiedUser({
        token,
        userToken: userInfo?.token,
      }).unwrap();

      // On success
      setSuccess(result.message);
      setError("");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, verify: true })
      );
      dispatch(LogedInUser({ ...userInfo, verify: true }));

      setTimeout(() => {
        setSuccess(""); // Clear success message
        navigate("/"); // Redirect to home
      }, 3000);
    } catch (err) {
      // On failure
      setError(err?.data?.message || "Something went wrong");
      setSuccess("");

      setTimeout(() => {
        navigate("/"); // Redirect to home even on error
      }, 3000);
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Activation</title>
      </Helmet>
      {success && (
        <Active
          type="success"
          Loading={loading}
          head="Your Account is Successfully Activated"
          text={success}
        />
      )}
      {error && (
        <Active
          type="error"
          Loading={loading}
          head="Activation Failed"
          text={error}
        />
      )}
      <CenterPart />
    </>
  );
}

export default ActivatePage;
