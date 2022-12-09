import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { orderItems, shippingPrice, totalPrice } = props;

  const subtotal = orderItems?.reduce(
    (acc, item) => acc + item?.price * item?.qty,
    0
  );
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Tên sản phẩm</th>
          <th style={{ width: "20%" }}>Đơn giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Thành tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {orderItems?.map((item) => (
          <tr key={item?._id}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item?.image?.base64}
                    alt={item?.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item?.name}</div>
              </Link>
            </td>
            <td>
              {Intl.NumberFormat("VN", {
                maximumSignificantDigits: 3,
              }).format(item?.price)}{" "}
              VNĐ
            </td>
            <td>3 </td>
            <td className="text-end">
              {Intl.NumberFormat("VN", {
                maximumSignificantDigits: 3,
              }).format(item?.price * item?.qty)}{" "}
              VNĐ
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng:</dt>{" "}
                <dd>
                  {Intl.NumberFormat("VN", {
                    maximumSignificantDigits: 3,
                  }).format(subtotal)}{" "}
                  VNĐ
                </dd>
              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển:</dt> <dd>{shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Thành tiền:</dt>
                <dd>
                  <b className="h5">
                    {Intl.NumberFormat("VN", {
                      maximumSignificantDigits: 3,
                    }).format(totalPrice)}{" "}
                    VNĐ
                  </b>
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
