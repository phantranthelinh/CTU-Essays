import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliveredOrder,
  getOrderDetails,
} from "../../Redux/Actions/OrderActions";
import Message from "./../LoadingError/Error";
import Loading from "./../LoadingError/Loading";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailProducts";
const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered;

  const deliveredHandler = () => {
    dispatch(deliveredOrder(order));
  };
  const handleDeleteOrder = () =>{

  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Trở về
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="card">
            <header
              className={`card-header p-3 Header-${
                order?.orderDetails.isCancelled ? "red" : "green"
              }`}
            >
              <div className="row align-items-center ">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="far fa-calendar-alt mx-2"></i>
                    <b className="text-white">
                      Đặt hàng vào lúc{" "}
                      {moment(order?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                    </b>
                  </span>
                  <br />
                  <small className="text-white mx-3 ">
                    Mã đơn hàng: {`greenstore-${order?._id.substring(0, 4)}`}
                  </small>
                </div>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <OrderDetailInfo
                user={order?.user}
                paymentMethod={order?.orderDetails?.paymentMethod}
                isPaid={order?.orderDetails?.isPaid}
                shippingAddress={order?.orderDetails?.shippingAddress}
              />

              <div className="row">
                <div className="col-lg-9">
                  <div className="table-responsive">
                    <OrderDetailProducts
                      orderItems={order?.orderDetails?.orderItems}
                      totalPrice={order?.orderDetails?.totalPrice}
                      shippingPrice={order?.orderDetails?.shippingPrice}
                    />
                  </div>
                </div>
                {/* Payment Info */}
                <div className="col-lg-3">
                  <div className="box shadow-sm bg-light">
                    {order.orderDetails?.isDelivered ? (
                      <button className="btn btn-secondary col-12">
                        Vận chuyển vào ({" "}
                        {moment(order?.orderDetails.deliveredAt).format(
                          "DD/MM/YYYY"
                        )}
                        )
                      </button>
                    ) : (
                      <>
                        {loadingDelivered && <Loading />}
                        <button
                          onClick={deliveredHandler}
                          className="btn btn-primary col-12"
                        >
                          Đã vận chuyển
                        </button>
                      </>
                    )}
                  </div>
                  <div className="box shadow-sm bg-light  ">
                    <button className="btn btn-primary col-12" onClick={handleDeleteOrder}>
                      Xóa đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default OrderDetailmain;
