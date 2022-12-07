import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { resizeFile } from "../../helper/fileHelper";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState(0);
  const [importPrice, setImportPrice] = useState(0);
  const [base64, setBase64] = useState("");
  const [file, setFile] = useState(null);
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;
  const onChangeFile = async (e) => {
    const selected = e.target.files[0];
    setBase64("");

    if (selected) {
      const maxWidth = 500;
      const maxHeight = 500;
      setFile(selected);
      const image = await resizeFile(selected, maxWidth, maxHeight);
      if (image) {
        setBase64(image);
      }
    }
  };

  useEffect(() => {
    if (product) {
      toast.success("Thêm mới sản phẩm thành công", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setBase64("");
      setSellPrice(0);
      setImportPrice(0);
      setQty(0);
    }
  }, [dispatch, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        sellPrice,
        importPrice,
        description,
        base64,
        qty
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm mới sản phẩm</h2>
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
                      Tên sản phẩm
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
                    <label htmlFor="product_price1" className="form-label">
                      Giá nhập
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      id="product_price1"
                      required
                      style={{ textAlign: "right" }}
                      value={importPrice}
                      onChange={(e) => setImportPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price2" className="form-label">
                      Giá bán
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      id="product_price2"
                      style={{ textAlign: "right" }}
                      required
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      style={{ textAlign: "right" }}
                      id="product_price"
                      required
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="7"
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={onChangeFile}
                    />
                    {file !== null ? <img src={base64} alt="Product_Photo" /> : null}
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

export default AddProductMain;
