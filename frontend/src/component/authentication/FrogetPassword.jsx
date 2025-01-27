import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import FindUser from "../resetPassword/FindUser";
import SearchResult from "../resetPassword/SearchResult";
import VerificationCode from "../resetPassword/VerificationCode";
import Newpassword from "../resetPassword/Newpassword";

function FrogetPassword() {
  const [visibaleComponent, setVisibleComponent] = useState(0);
  const [error, setError] = useState("");
  const [suceess, setSuccess] = useState("");
  const [foundUser, setFoundUser] = useState("");

  const ComponentShow = () => {
    switch (visibaleComponent) {
      case 0:
        return (
          <FindUser
            setError={setError}
            error={error}
            setFoundUser={setFoundUser}
            setVisibleComponent={setVisibleComponent}
          />
        );
      case 1:
        if (foundUser) {
          return (
            <SearchResult
              setVisibleComponent={setVisibleComponent}
              foundUser={foundUser}
              setSuccess={setSuccess}
              suceess={suceess}
              setError={setError}
              error={error}
            />
          );
        }
        visibaleComponent(0);
        return null;

      case 2:
        if (foundUser) {
          return (
            <VerificationCode
              setVisibleComponent={setVisibleComponent}
              foundUser={foundUser}
              setSuccess={setSuccess}
              suceess={suceess}
              setError={setError}
              error={error}
            />
          );
        }
        visibaleComponent(0);
        return null;
      case 3:
        if (foundUser) {
          return (
            <Newpassword
              setVisibleComponent={setVisibleComponent}
              foundUser={foundUser}
              setSuccess={setSuccess}
              suceess={suceess}
              setError={setError}
              error={error}
            />
          );
        }
        visibaleComponent(0);
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="w-full bg-gradient-to-br h-screen from-pink-100 to-purple-100 via-cyan-100 flex items-center justify-center">
        {ComponentShow()}
      </div>
    </>
  );
}

export default FrogetPassword;
