import React from "react";
import { ErrorPage } from "../components";
// import lostImage from "../assets/images/404.svg";

const InternalServerError = () => {
  return <ErrorPage title="500" description="Internal server error" />;
};

export default InternalServerError;
