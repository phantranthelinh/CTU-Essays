import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StaffType from "./StaffType";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listStaffType } from "../../Redux/Actions/StaffTypeAction";

const Main = () => {
  const dispatch = useDispatch();

  const staffTypeList = useSelector((state) => state.staffTypeList);
  const { loading, staffTypes: data } = staffTypeList;

  const staffTypeDelete = useSelector((state) => state.staffTypeDelete);
  const { success, error } = staffTypeDelete;

  useEffect(() => {
    dispatch(listStaffType());
  }, [dispatch, success]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title text-uppercase">
          DANH SÁCH chức vụ nhân viên
        </h2>
        <div>
          <Link to="/add-staff-type" className="btn btn-primary">
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
              {data.staffTypes?.map((st) => (
                <StaffType staffType={st} key={st._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Main;
