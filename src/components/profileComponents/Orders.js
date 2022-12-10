import React from "react";
import Loading from "../LoadingError/Loading";
import moment from "moment";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
const Orders = (props) => {
  const { orders, error, loading } = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading && <Loading />}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {orders?.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              Không có đon đặt hàng
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                Bắt đầu mua sắm
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Trạng thái</th>
                    <th>Tình trạng vận chuyển</th>
                    <th>Thanh toán</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => {
                    return (
                      <tr key={index} className={`${order?.orderDetails?.isCancelled ? "alert-danger" : "alert-success"}`}>
                        <td>
                          <a href={`/order/${order._id}`} className="link">
                            {order?.user?.name.substr(-4) +
                              "-" +
                              order._id.substr(-7)}
                          </a>
                        </td>
                        <td>
                          {order.isPaid
                            ? moment(order?.orderDetails?.paidAt).format(
                                "HH:mm:ss DD/MM/YYYY"
                              )
                            : moment(order?.orderDetails?.createdAt).format(
                                "HH:mm:ss DD/MM/YYYY"
                              )}
                        </td>
                        <td>
                          {order?.orderDetails?.isCancelled
                            ? "Đã hủy"
                            : "Thành công"}
                        </td>
                        <td>
                          {order?.orderDetails.isDelivered
                            ? "Đang giao hàng"
                            : "Đang chuyển cho bên vận chuyển"}
                        </td>
                        <td>
                          {order?.orderDetails.isPaid
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                        </td>
                       
                        <td style={{ color: "red" }}>
                          {Intl.NumberFormat("VN", {
                            maximumSignificantDigits: 3,
                          }).format(order.orderDetails.totalPrice)}{" "}
                          VNĐ
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
