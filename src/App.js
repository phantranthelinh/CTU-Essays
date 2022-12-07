import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./Redux/Actions/ProductActions";
import { listOrder } from "./Redux/Actions/OrderActions";
import AddStaffType from "./screens/AddStaffType";
import StaffTypeScreen from "./screens/StaffTypeScreen";
import StaffScreen from "./screens/StaffScreen";
import StaffEditScreen from "./screens/StaffEditScreen";
import StaffTypeEditScreen from "./screens/StaffTypeEditScreen";
import AddStaff from "./screens/AddStaff";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProduct());
      dispatch(listOrder());
    }
  }, [dispatch, userInfo]);
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter exact path="/" component={HomeScreen} />
          <PrivateRouter exact path="/products" component={ProductScreen} />
          <PrivateRouter exact path="/orders" component={OrderScreen} />
          <PrivateRouter
            exact
            path="/order/:id"
            component={OrderDetailScreen}
          />
          <PrivateRouter exact path="/add-product" component={AddProduct} />
          <PrivateRouter
            exact
            path="/add-staff-type"
            component={AddStaffType}
          />

          <PrivateRouter exact path="/add-staff" component={AddStaff} />

          <PrivateRouter exact path="/customers" component={UsersScreen} />
          <PrivateRouter exact path="/staffs" component={StaffScreen} />
          <PrivateRouter
            exact
            path="/staff-types"
            component={StaffTypeScreen}
          />

          <PrivateRouter
            exact
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <PrivateRouter
            exact
            path="/staff-types/:id"
            component={StaffTypeEditScreen}
          />
          <PrivateRouter exact path="/staffs/:id" component={StaffEditScreen} />

          <Route exact path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
