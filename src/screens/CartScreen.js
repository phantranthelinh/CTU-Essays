import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../Redux/Actions/CartActions";
import { useState } from "react";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  const [validate, setValidate] = useState(null);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const HandleCheckOut = () => {
    history.push("/login?redirect=shipping");
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng của bạn đang trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Mua hàng ngay
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Tổng sản phẩm
              <Link className="text-danger mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item, idx) => (
              <div className="cart-iterm row" key={idx}>
                <div className="remove-button d-flex justify-content-center align-items-center">
                  <i
                    className="fas fa-times"
                    onClick={() => handleRemoveFromCart(item.product)}
                  ></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item?.image?.base64} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Số lượng</h6>

                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    max={item?.countInStock}
                    onChange={(e) => {
                      if (e.target.value > item.countInStock) {
                        setValidate({
                          ...validate,
                          quantity: {
                            error: true,
                            text: "Số lượng lớn hơn số lượng hiện có",
                          },
                        });
                      } else {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                        setValidate({
                          ...validate,
                          quantity: {
                            error: false,
                            text: "",
                          },
                        });
                      }
                    }}
                  />
                  {validate?.quantity?.error && (
                    <span className="text-danger mt-2 ">
                      {validate?.quantity?.text}
                    </span>
                  )}
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Giá</h6>
                  <h4>
                    {Intl.NumberFormat("VN", {
                      maximumSignificantDigits: 3,
                    }).format(item.price)}{" "}
                    VNĐ
                  </h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng tiền:</span>

              <span className="total-price" style={{ color: "red" }}>
                {Intl.NumberFormat("VN", {
                  maximumSignificantDigits: 3,
                }).format(total)}{" "}
                VNĐ
              </span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>quay lại mua hàng</button>
              </Link>
              {!validate?.quantity?.error && total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={HandleCheckOut}>Tiếp tục</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
