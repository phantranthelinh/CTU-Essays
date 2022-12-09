import React, { useEffect } from "react";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../LoadingError/Loading";
import Message from "./../LoadingError/Error";
import { listOrder } from './../../Redux/Actions/OrderActions';

const OrderMain = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(listOrder())
  }, [dispatch ])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title text-uppercase">Danh sách đơn đặt hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
   
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
