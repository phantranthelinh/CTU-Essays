import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { register } from "./../Redux/Actions/UserActions";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input 
            
            type="text"
            placeholder="Tên người dùng"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="mt-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-2"
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng ký</button>
          <p>
            <Link to={redirect ? `/login?redicrect=${redirect}` : "/login"}>
              Có tài khoản? <strong>Đăng nhập</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
