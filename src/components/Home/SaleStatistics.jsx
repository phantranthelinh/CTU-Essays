/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */

import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale,
  PointElement, Title,
  Tooltip
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../Redux/Actions/OrderActions";
import { listProduct } from './../../Redux/Actions/ProductActions';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ProductsStatistics = () => {
  const colors = {
    green: "#4CAF50",
    red: "#DB190C",
    purple: "#8624DB",
    white: "#fff",
    orange: "#FF9066",
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.orange,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const labels = [
    "Một",
    "Hai",
    "Ba",
    "Bốn",
    "Năm",
    "Sáu",
    "Bảy",
    "Tám",
    "Chín",
    "Mười",
    "M.Một",
    "M.Hai",
  ];
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(listOrder());
    dispatch(listProduct())
  }, [dispatch]);

  useEffect(() => {
    const revenueByMonths = () => {
      for (let i = 0; i < 12; i++) {
        const revenue =
          orders
            ?.filter((item) => new Date(item.createdAt).getMonth() === i)
            ?.reduce((a, b) => {
              return a + b.orderDetails.totalPrice;
            }, 0) || 0;
        setData((prev) => [...prev, revenue]);
      }
    };
    revenueByMonths();
  }, [orders]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: data,
      },
    ],  
  };

  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          {/* <h5 className="card-title">Sales statistics</h5>

          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-greenstore-grfdq/embed/charts?id=62760ffc-4ba8-4ff4-8863-41cccdce4f22&maxDataAge=1800&theme=light&autoRefresh=true"
          ></iframe> */}
          <div className="title mb">Doanh thu theo tháng</div>
          <div>
            <Bar options={chartOptions} data={chartData} height={`300px`} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
