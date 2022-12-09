import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getUserDetails } from "../Redux/Actions/UserActions";
import { saveShippingAddress } from "./../Redux/Actions/CartActions";
const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (address !== "") {
      await dispatch(saveShippingAddress({ address: address }));
      history.push("/payment");
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ĐỊA CHỈ GIAO HÀNG</h6>
          {user?.addresses?.length !== 0 ? (
            <>
              <div className="flex-box d-flex justify-content-between align-items-start flex-column">
                <select
                  className="mt-2"
                  style={{ padding: "16px", width: "100%" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  <option value="" selected>
                    Chọn địa chỉ
                  </option>
                  {user?.addresses?.length > 0 &&
                    user?.addresses?.map((item, i) => (
                      <option key={i} value={item.address}>
                        {item.address}
                      </option>
                    ))}
                </select>
              </div>
            </>
          ) : null}

          <input
            className="mt-4"
            type="text"
            placeholder="Nhập địa chỉ mới"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit">
            <Link to="/payment" className="text-white">
              Tiếp tục
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
