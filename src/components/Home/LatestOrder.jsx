import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";
const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h5 className="card-title">Đơn hàng mới</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Đặt hàng vào lúc</th>
                  <th scope="col">Thanh toán</th>
                  <th scope="col">Vận chuyển</th>
                  <th scope="col">Trạng thái</th>

                  <th scope="col">Thao tác</th>


                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>
                        <b>{order.user.name}</b>
                      </td>
                      <td>{order.user.email}</td>
                      <td>
                        {Intl.NumberFormat("VN", {
                          maximumSignificantDigits: 3,
                        }).format(order.orderDetails.totalPrice)}{" "}
                        VNĐ
                      </td>
                      <td>
                        {moment(order.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill btn-${
                            order?.orderDetails?.isPaid ? "success" : "danger"
                          }`}
                        >
                          {order?.orderDetails?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill btn-${
                            order.orderDetails?.isDelivered ? "success" : "danger"
                          }`}
                        >
                          {order.orderDetails?.isDelivered ? "Đang vận chuyển" : "Chưa vận chuyển"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill btn-${
                            order.orderDetails?.isCancelled ? "danger" : "success"
                          }`}
                        >
                          {order.orderDetails?.isCancelled ? "Đơn hàng bị hủy" : "Thành công"}
                        </span>
                      </td>

                      <td className="d-flex justify-content-end align-item-center">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-success"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default LatestOrder;
