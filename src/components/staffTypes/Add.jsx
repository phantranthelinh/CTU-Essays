import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createStaffType } from "../../Redux/Actions/StaffTypeAction";
import { STAFF_TYPE_CREATE_RESET } from "../../Redux/Constants/StaffTypeConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const Add = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const staffTypeCreate = useSelector((state) => state.staffTypeCreate);
  const { loading, error, staffType } = staffTypeCreate;

  useEffect(() => {
    if (staffType) {
      toast.success("Thêm mới chức vụ thành công", ToastObjects);
      dispatch({ type: STAFF_TYPE_CREATE_RESET });
      setName("");
    }
  }, [dispatch, staffType]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createStaffType(name));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/staff-types" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm mới chức vụ</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tên chức vụ
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Add;
