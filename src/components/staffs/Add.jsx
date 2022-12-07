import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createStaff } from "../../Redux/Actions/StaffAction";
import { STAFF_TYPE_CREATE_RESET } from "../../Redux/Constants/StaffTypeConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { listStaffType } from './../../Redux/Actions/StaffTypeAction';
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staffType, setStaffType] = useState("");
  const dispatch = useDispatch();

  const staffTypeList = useSelector((state) => state.staffTypeList);
  const { staffTypes:data } = staffTypeList;
  const staffCreate = useSelector((state) => state.staffCreate);
  const { loading, error, staff } = staffCreate;

  useEffect(() => {
    dispatch(listStaffType())
  }, [dispatch])

  useEffect(() => {
    if (staff) {
      toast.success("Thêm mới nhân viên thành công", ToastObjects);
      dispatch({ type: STAFF_TYPE_CREATE_RESET });
      setName("");
      setEmail("")
      setPassword("");
      setStaffType("")
    }
  }, [dispatch, staff]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createStaff( name, email, password, staffType ));
  };


  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/staffs" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm mới nhân viên mới</h2>
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
                      Tên nhân viên
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
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      id="product_title"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Mật khẩu
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      id="product_title"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="staff-type">Chọn chức vụ:</label>
                    <select id="staff-type" value={data?.staffTypes?.[2]?.name } onChange={(e) => setStaffType(e.target.value)}>
                      {data?.staffTypes?.length > 0 && data?.staffTypes?.map((st) => {
                        return <option value={st?._id} key={st?._id} >{st?.name}</option>;
                      })}
                    </select>
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
