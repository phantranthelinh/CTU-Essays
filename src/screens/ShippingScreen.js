import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getUserDetails } from "../Redux/Actions/UserActions";
import { saveShippingAddress } from "./../Redux/Actions/CartActions";
const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress);
  const [newAddress, setNewAddress] = useState("");
  const [typeAddress, setTypeAddress] = useState("select");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {  userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;


  useEffect(() => {
    dispatch(getUserDetails(userInfo._id))
  },[dispatch , userInfo._id])

  useEffect(() =>{
    if(user?.addresses?.length ===0){
      setTypeAddress("input")
    }
  },[user?.addresses?.length])
  const submitHandler = (e) => {
    e.preventDefault();
    if (typeAddress === "select") {
      dispatch(saveShippingAddress({ address: address }));
    } else {
      dispatch(saveShippingAddress({ address: newAddress }));
    }
    history.push("/payment");
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
          {user?.addresses?.length !== 0 ? <>
            <div className="radio-group">
            <input
              type="radio"
              value="select"
              name="address"
              onChange={(e) => setTypeAddress("select")}
              id="address1"
            />
            <label htmlFor="address1">Chọn địa chỉ</label>
          </div>

          <div className="flex-box d-flex justify-content-between align-items-start flex-column">
            <select
              disabled={typeAddress !== "select"}
              className="mt-2"
              style={{ padding: "16px", width: "100%" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              {user?.addresses?.length > 0 &&
                user?.addresses?.map((item, i) => (
                  <option key={i} value={item.address}>
                    {item.address}
                  </option>
                ))}
            </select>
          </div>
          <div className="radio-group mt-4">
            <input
              type="radio"
              value="input"
              name="address"
              onChange={(e) => setTypeAddress(`input`)}
              id="address2"
            />
            <label htmlFor="address2">Địa chỉ khác</label>
          </div>
          </> : null}
        
          
          <input
            disabled={typeAddress !== "input"}
            type="text"
            placeholder="Nhập địa chỉ mới"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
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
