import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() =>{

  }, [userInfo])
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ height: "60" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Trang chủ</span>
              </NavLink>
            </li>
            {userInfo?.staffType?.name === "Quản lý" || userInfo?.staffType?.name === "Quản trị"  ?  (
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Sản phẩm</span>
                </NavLink>
              </li>
            ) : null}

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Đơn đặt hàng</span>
              </NavLink>
            </li>
            {userInfo?.staffType?.name === "Quản lý" ||
            userInfo?.staffType?.name === "Quản trị" ? (
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/customers"
                >
                  <i className="icon fas fa-user"></i>
                  <span className="text">Khách hàng</span>
                </NavLink>
              </li>
            ) : null}
            {userInfo?.staffType?.name === "Quản trị" ? (
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/staffs"
                >
                  <i className="icon fa fa-users"></i>
                  <span className="text">Nhân viên</span>
                </NavLink>
              </li>
            ) : null}
            {userInfo?.staffType?.name === "Quản trị" ? (
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/staff-types"
                >
                  <i className="icon fa fa-user-secret"></i>
                  <span className="text">Chức vụ</span>
                </NavLink>
              </li>
            ) : null}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
