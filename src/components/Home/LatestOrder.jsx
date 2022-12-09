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
            <table className="table">
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
                      <td>{moment(order.createdAt).format("HH:mm:ss DD/MM/YYYY")}</td>
                      <td>
                        <span
                          className={`badge rounded-pill btn-${
                            order.isDelivered ? "success" : "danger"
                          }`}
                        >
                          {order.isDelivered ? "Delivered" : "Not delivered"}
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
