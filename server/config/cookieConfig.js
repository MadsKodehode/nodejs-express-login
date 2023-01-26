require("dotenv").config();

const cookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "development" ? false : "strict",
  secure: process.env.NODE_ENV === "development" ? false : true,
};

module.exports = cookieOptions;
