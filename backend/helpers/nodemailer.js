const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, REFRESH_TOKEN, MAILLING_SECRET, MAILLING_ID } = process.env;

const auth = new OAuth2(
  MAILLING_ID,
  MAILLING_SECRET,
  REFRESH_TOKEN,
  oauth_link
);
exports.sendVarifiedMail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILLING_ID,
      clientSecret: MAILLING_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Heartify Varification",
    html: `<div style=" padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 7px; " > <h1 style=" font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; line-height: 25px; " > Hello ${name}... </h1> <p style=" font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; margin:15px 0 " > Hello ${name}. Hope you're doing well. pLease varify your account to stay with us. </p> <a href=${url} style=" font-weight: bold; text-decoration: none; border: 1px solid #ddd; padding: 10px 20px; border-radius: 4px; display: inline-block; " OnMouseOver="this.style.backgroundColor='#ebd2d2'" OnMouseLeave="this.style.backgroundColor='transparent'" >Email varify</a > </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) {
      return err.message;
    } else {
      return res;
    }
  });
};
// password reset code send
exports.sendCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILLING_ID,
      clientSecret: MAILLING_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `<div style=" padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 7px; " > <h1 style=" font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; line-height: 25px; " > Hello ${name}... </h1> <p style=" font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; margin:15px 0 " > Hello ${name}. Hope you're doing well. pLease varify your account to stay with us. </p> <p style=" font-weight: bold; text-decoration: none; border: 1px solid #ddd; padding: 10px 20px; border-radius: 4px; display: inline-block; " OnMouseOver="this.style.backgroundColor='#ebd2d2'" OnMouseLeave="this.style.backgroundColor='transparent'" >${code}</ p> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) {
      return err.message;
    } else {
      return res;
    }
  });
};
