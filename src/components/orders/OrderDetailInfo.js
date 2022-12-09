import React from "react";

const OrderDetailInfo = (props) => {
  const { user, shippingAddress, paymentMethod } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thông tin khách hàng</h6>
            <p className="mb-1">
              {user?.name} <br />
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thông tin đơn hàng</h6>
            <p className="mb-1">Phương thức thanh toán: {paymentMethod}</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Vận chuyển đến</h6>
            <p className="mb-1">
              Địa chỉ: {shippingAddress}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
