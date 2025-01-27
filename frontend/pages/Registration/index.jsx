import React from "react";
import LeftAuth from "../../component/authentication/LeftAuth";
import { RegSVG } from "../../svg/RegSVG";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import RegistrationForm from "../../component/authentication/RegistrationForm";

function Registration() {
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="relative overflow-hidden :">
        <div className="absolute w-[100px] lg:w-[250px] h-[100px] lg:h-[250px]  rounded-full -top-7 -left-7 -lg:left-[100px] -lg:top-[60px]  animate-[colorCombinition_3s_linear_infinite] z-[-1]"></div>
        <div className="absolute w-[100px] lg:w-[250px] h-[100px] lg:h-[250px]  rounded-full -lg:right-[100px] -lg:bottom-[80px] animate-[colorCombinition_3s_linear_infinite] z-[-1] -bottom-9 -right-9"></div>
        <div className="container  ">
          <div className="flex gap-x-6 h-screen justify-between items-center lg:mx-4 xl:mx-0">
            <div className="hidden lg:block w-[45%] lg:w-[47%] XL:w-[45%]">
              <LeftAuth
                tittle={"Start Your Journey With Heartify"}
                description={` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel cumque
        porro optio, nisi recusandae, quos quae molestiae dicta ducimus eos
        facere expedita eaque ad voluptatibus repellendus. Illo deleniti
        nesciunt odio.`}
                regIcon={<RegSVG />}
              />
            </div>
            <div className="w-full lg:w-[49%] xl:w-[45%]">
              <RegistrationForm toast={toast} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
