import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editStaffType,
  updateStaffType
} from "../../Redux/Actions/StaffTypeAction";
import { STAFF_TYPE_UPDATE_RESET } from "../../Redux/Constants/StaffTypeConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditProductMain = (props) => {
  const { staffTypeId } = props;
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const staffTypeEdit = useSelector((state) => state.staffTypeEdit);
  const { loading, error, staffType } = staffTypeEdit;

  const staffTypeUpdate = useSelector((state) => state.staffTypeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = staffTypeUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STAFF_TYPE_UPDATE_RESET });
      toast.success("Cập nhật thành công", ToastObjects);
      dispatch(editStaffType(staffTypeId));
    }

    if (!staffType?.name || staffType._id !== staffTypeId) {
      dispatch(editStaffType(staffTypeId));
    } else {
      setName(staffType?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffType, dispatch, staffTypeId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStaffType({
        id: staffTypeId,
        name,
      })
    );
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
                      {" "}
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên chức vụ
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
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

export default EditProductMain;
