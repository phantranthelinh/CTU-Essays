/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import { cancelOrder, getOrderDetails } from "../Redux/Actions/OrderActions";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";

const OrderScreen = (props) => {
  window.scrollTo(0, 0);
  const { match } = props;

  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { success: successCancel, loading: loadingCancel } = orderCancel;

  if (!loading) {
    const addDecimals = (num) => {
      return Math.round(num * 100) / 100;
    };
    order.itemsPrice = addDecimals(
      order?.orderDetails?.orderItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if(successCancel){
      toast.success("Hủy đơn hàng thành công")
    }
  }, [dispatch, orderId, successCancel]);

  const HandleCancelOrder = () => {
    dispatch(cancelOrder(orderId));
    
  };
  return (
    <>
    <Toast/>
      <Header />

      <div className="container">
        <h2 className="text-center mt-4">
          Thông tin đơn hàng -{" "}
          {order?.orderDetails?.isCancelled ? (
            <span className="text-danger text-center">
              Đơn hàng đã đươc hủy
            </span>
          ) : null}
        </h2>

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Thông tin khách hàng</strong>
                    </h5>
                    <p>Tên: {order?.user?.name}</p>
                    <p>
                      Email:{" "}
                      <a href={`mailto:${order?.user?.email}`}>
                        {order?.user?.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Thông tin đặt hàng</strong>
                    </h5>
                    <p>
                      Hình thức thanh toán: {order?.orderDetails?.paymentMethod}
                    </p>
                    {order?.orderDetails?.isPaid ? (
                      <div className="bg-success p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã thanh toán
                        </p>
                      </div>
                    ) : (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa thanh toán
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Vận chuyển đến</strong>
                    </h5>
                    <p>Địa chỉ: {`${order?.orderDetails?.shippingAddress}`}</p>
                    {order?.isDelivered ? (
                      <div className="bg-success p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã vận chuyển lúc{" "}
                          {moment(order?.orderDetails?.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-info p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa vận chuyển
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order?.orderDetails?.orderItems?.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Thông tin đặt hàng hiện đang trống
                  </Message>
                ) : (
                  order?.orderDetails?.orderItems?.map((item, idx) => {
                    return (
                      <div key={idx} className="order-product row">
                        <div className="col-md-3 col-6">
                          <img src={item?.image?.base64} alt={item.name} />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                          <h4>Số lượng</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                          <h4>Đơn giá</h4>
                          <h6 style={{ color: "red" }}>
                            {Intl.NumberFormat("VN", {
                              maximumSignificantDigits: 3,
                            }).format(item.price)}{" "}
                            VNĐ
                          </h6>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Giá</strong>
                      </td>
                      <td>
                        {Intl.NumberFormat("VN", {
                          maximumSignificantDigits: 3,
                        }).format(order?.itemsPrice)}{" "}
                        VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Chi phí vận chuyển</strong>
                      </td>
                      {order?.shippingPrice == 0 ? (
                        <td>Free</td>
                      ) : (
                        <td>
                          {Intl.NumberFormat("VN", {
                            maximumSignificantDigits: 3,
                          }).format(order?.orderDetails?.shippingPrice)}{" "}
                          VNĐ
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng cộng</strong>
                      </td>
                      <td>
                        {Intl.NumberFormat("VN", {
                          maximumSignificantDigits: 3,
                        }).format(order?.orderDetails?.totalPrice)}{" "}
                        VNĐ
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="col-12">
                  {order?.orderDetails?.isCancelled ? (
                    <></>
                  ) : (
                    <button onClick={HandleCancelOrder}>Hủy đơn hàng</button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
