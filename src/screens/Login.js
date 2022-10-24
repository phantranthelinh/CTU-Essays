import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Redux/Actions/UserActions";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
          className="mt-2"
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          <p>
            <Link
              to={redirect ? `/register?redicrect=${redirect}` : "/register"}
            >
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
