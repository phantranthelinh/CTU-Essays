import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ManagerRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      component={(props) => {
        if (userInfo?.staffType?.name === "Quản lý" || userInfo?.staffType?.name === "Quản trị" ) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}
