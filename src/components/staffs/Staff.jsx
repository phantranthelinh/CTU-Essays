import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStaff } from "../../Redux/Actions/StaffAction";
const Staff = (props) => {
  const { staff } = props;
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteStaff(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src="/images/user.png" alt="Product" />
          </Link>
          <div className="info-wrap">
            <span  className="title text-truncate text-center" style={{ fontSize: "1.6rem", fontWeight: 600}}>
              {staff.name}
            </span>
            <span  className="title text-truncate text-center" style={{ fontSize: "1.6rem", fontWeight: 600}}>
              {`Chức vụ: ${staff.staffType.name}`}
            </span>
         
            <div className="row">
              <Link
                to={`/staffs/${staff._id}`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deleteHandler(staff._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
