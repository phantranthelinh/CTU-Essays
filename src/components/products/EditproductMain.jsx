import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { resizeFile } from "../../helper/fileHelper";
import { useMemo } from "react";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditProductMain = (props) => {
  const { productId } = props;
  const [name, setName] = useState("");
  const [importPrice, setImportPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [base64, setBase64] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;


  const dataFormatted = useMemo(() => {
    return {
      image: product?.image?.base64,
      description: product?.description,
      name: product?.name,
      numReviews: product?.numReviews,
      rating: product?.rating,
      slug: product?.slug,
      salePrice: product?.salePrice,
      createdAt: product?.createdAt,
      countInStock: product?.importProductDetail?.countInStock,
      importPrice: product?.importProductDetail?.importPrice,
    };
  }, [product]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Cập nhật thành công", ToastObjects);
      dispatch(editProduct(productId));
    }

    if (!product?.name || product._id !== productId) {
      dispatch(editProduct(productId));
    } else {
      setName(dataFormatted.name);
      setDescription(dataFormatted.description);
      setImage(dataFormatted.image.base64);
      setImportPrice(dataFormatted.importPrice);
      setSalePrice(dataFormatted.salePrice);

      setCountInStock(dataFormatted.countInStock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, dispatch, productId, successUpdate]);

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

  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        salePrice,
        importPrice,
        description,
        image: base64,
        countInStock,
      })
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
            <h2 className="content-title">Chỉnh sửa sản phẩm</h2>
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
                          Tên sản phẩm
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
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá nhập
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={importPrice}
                          onChange={(e) => setImportPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá giá bán
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={salePrice}
                          onChange={(e) => setSalePrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số lượng trong kho
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
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
                        {file === null ? (
                          <img src={dataFormatted.image} alt="Product_Photo" />
                        ) : <img src={base64} alt="Product_Photo" />}
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
