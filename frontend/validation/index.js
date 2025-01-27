import * as yup from "yup";
export const signUp = yup.object({
  fname: yup.string().min(3).max(15).required("Please input your First Name"),
  lname: yup.string().min(3).max(15).required("Please input your last Name"),
  email: yup.string().required("Please input your email"),
  password: yup.string().min(8).required("Please input your password"),
  gender: yup.string().required("Please input your Gender"),
});
export const signIn = yup.object({
  email: yup.string().required("Please input your email"),
  password: yup.string().min(8).required("Please input your password"),
});
export const findUser = yup.object({
  email: yup.string().required("Please input your email/Number"),
});
export const code = yup.object({
  code: yup
    .string()
    .min(5, "Code must be 5 characters")
    .max(5, "Code length maximum 5 characters")
    .required("Please input your verification Code"),
});
export const password = yup.object({
  password: yup.string().min(8).required("Please input new your password"),
});
