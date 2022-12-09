import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import Header from "./../components/Header";
const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [paymentMethod, setPaymentMethod] = useState("");


  const totalPrice = cartItems.reduce((cur ,item) => cur + item.price , 0)
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const initialOptions = {
    currency: "USD",
    intent: "capture",
    "client-id":
      "Af9l7eOHjHzp-zp1UhBbb1iMXJd86O89cO8uLOqAGg_olynXvHjyt9dnIjvpghSrpawFtV40K8C1MZo8",
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };


  return (
    <>
      <Toast />
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                id="direct-payment"
                value="Thanh toán khi nhận hàng"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label forHtml="direct-payment" className="form-check-label">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value:Number(totalPrice/23000).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    toast.success(`Giao dịch thành công ${name}`);
                    setPaymentMethod("paypal");
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>

          <button type="submit">
            <Link to="/placeorder" className="text-white">
              Tiếp tục
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
