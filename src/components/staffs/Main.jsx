import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listStaff } from "./../../Redux/Actions/StaffAction";
import Staff from "./Staff";

const Main = () => {
  const dispatch = useDispatch();

  const staffList = useSelector((state) => state.staffList);
  const { loading, staffs } = staffList;

  const staffDelete = useSelector((state) => state.staffDelete);
  const { success, error } = staffDelete;

  useEffect(() => {
    dispatch(listStaff());
  }, [dispatch, success]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title text-uppercase">Danh sách nhân viên</h2>
        <div>
          <Link to="/add-staff" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {staffs.length > 0 &&
                staffs?.map((staff) => <Staff staff={staff} key={staff._id} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Main;
