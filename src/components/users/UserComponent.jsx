import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/UserActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title text-uppercase">danh sách khách hàng</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        {/* Card */}
        <div className="card-body">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            {loading && <Loading />}
            {error && <Message value="alert-danger">{error}</Message>}
            {users?.map((user) => (
              <div className="col" key={user._id}>
                <div className="card card-user shadow-sm">
                  <div className="card-header">
                    <img
                      className="img-md img-avatar"
                      src="images/favicon.png"
                      alt="User pic"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mt-5">{user.name}</h5>
                    <div className="card-text text-muted">
                      <p className="m-0">
                        {user.isAdmin === true ? "Admin" : "Khách hàng"}
                      </p>
                      <p>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
