import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SaleStatistics";
// import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";
import { listOrder } from "../../Redux/Actions/OrderActions";
import { useDispatch } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  useEffect(() => {
    dispatch(listOrder());
    dispatch(listProduct());

  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Trang chủ </h2>
        </div>

        <TopTotal orders={orders} products={products} />
        <div className="row">
          <SaleStatistics />
          {/* <ProductsStatistics /> */}
        </div>

        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
