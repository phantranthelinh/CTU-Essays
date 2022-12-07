import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { editStaff, updateStaff } from "../../Redux/Actions/StaffAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { listStaffType } from "./../../Redux/Actions/StaffTypeAction";
import { STAFF_UPDATE_RESET } from "./../../Redux/Constants/StaffConstants";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const Edit = (props) => {
  const { staffId } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staffType, setStaffType] = useState("");

  const dispatch = useDispatch();

  const staffEdit = useSelector((state) => state.staffEdit);
  const { staff, loading, error } = staffEdit;

  const staffTypeList = useSelector((state) => state.staffTypeList);
  const { staffTypes: data } = staffTypeList;

  const staffUpdate = useSelector((state) => state.staffUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = staffUpdate;

  //TODO: Get list of staff type from database
  useEffect(() => {
    dispatch(listStaffType());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STAFF_UPDATE_RESET });
      toast.success("Cập nhật thành công", ToastObjects);
      dispatch(editStaff(staffId));
    }
    if (!staff?.name || staff._id !== staffId) {
      dispatch(editStaff(staffId));
    } else {
      setName(staff?.name);
      setEmail(staff?.email);
      setPassword(staff?.password);
      setStaffType(staff?.staffType?._id);
    }
  }, [staff, dispatch, staffId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const dataSubmit = {
      id: staffId,
      name,
      password,
      staffType,
      email,
    };
    dispatch(updateStaff(dataSubmit));
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
            <h2 className="content-title">Chỉnh sửa chức vụ</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}

                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên nhân viên
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập vào đây..."
                          className="form-control"
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
                          type="password"
                          placeholder="Nhập vào đây..."
                          className="form-control"
                          autoComplete="on"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="staff-type">Chọn chức vụ:</label>
                        <select
                          id="staff-type"
                          value={staff?.staffType?._id}
                          onChange={(e) => setStaffType(e.target.value)}
                        >
                          {data?.staffTypes?.length > 0 &&
                            data?.staffTypes?.map((st) => {
                              return (
                                <option value={st?._id} key={st?._id}>
                                  {st?.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Edit;
