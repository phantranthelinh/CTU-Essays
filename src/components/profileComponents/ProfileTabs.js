import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/UserActions";
import Message from "./../LoadingError/Error";
import Loading from "./../LoadingError/Loading";
import Toast from "./../LoadingError/Toast";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHouver: false,
    autoClose: 2000,
    theme: "colored",
  };

  const toastId = useRef(null);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, user]);

  const handleChangeAddressDefault = (e) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Mật khẩu và xác nhận lại mật khẩu không trùng khớp",
          ToastObjects
        );
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, password, phone, address }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Cập nhật thành công", ToastObjects);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}

      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-12">
          <div className="form">
            <label htmlFor="account-fn">Tên người dùng</label>
            <input
              className="form-control"
              type="text"
              defaultValue={name}
              disabled
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="form">
            <label htmlFor="account-email">Địa chỉ email</label>
            <input
              disabled
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form">
            <label htmlFor="account-pass">Số điện thoại</label>
            <input
              className="form-control"
              type="text"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Địa chỉ</label>
            <input
              className="form-control"
              type="text"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Địa chỉ đã nhập</label>
            <select
              className="mt-2"
              style={{ padding: "16px", width: "100%" }}
              onChange={handleChangeAddressDefault}
            >
              {user?.addresses?.map((address) => {
                return <option key={address?._id} value={address._id}>{address.address}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận lại mật khẩu</label>
            <input
              className="form-control"
              type="password"
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </>
  );
};

export default ProfileTabs;
