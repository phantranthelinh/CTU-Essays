const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");
const ImageProduct = require("../models/ImageModel");
const ImportProductDetail = require("../models/ImportProductDetailModel");
const ImportProduct = require("../models/ImportProductModel");
const Product = require("../models/ProductModel");
const ProductData = require("../data/product");

router.post(
  "/",
  protect,
  admin,
  expressAsyncHandler(async (req, res) => {
    if (ProductData.length == 0) {
      res.status(304).json({ message: "Dữ liệu trống, Thêm thất bại" });
      return;
    } else {
      ProductData.map(async (data) => {
        res.setHeader("Content-Type", "application/json");
        const productExits = await ImportProductDetail.findOne({
          name: data.name,
        });
        if (productExits) {
          res.status(401).json({ message: "Sản phẩm đã tồn tại" });
          return;
        } else {
          const importProduct = new ImportProduct({
            userId: req.user._id,
          });
          if (importProduct) {
            const createdImportProduct = await importProduct.save();

            const imageProduct = new ImageProduct({
              productId: createdImportProduct._id,
              base64: data.image,
            });
            const createdImageProduct = await imageProduct.save();
            const importProductDetail = new ImportProductDetail({
              importId: createdImportProduct._id,
              importPrice: data.importPrice,
              countInStock: data.quantity,
              name: data.name,
            });
            await importProductDetail.save();

            if (importProductDetail) {
              const product = new Product({
                name: data.name,
                salePrice: data.salePrice,
                importId: createdImportProduct._id,
                description: data.description,
                image: createdImageProduct._id,
                importProductDetail: importProductDetail._id,
              });
              await product.save();

              res.status(200).json({ message: "Thêm sản phẩm thành công!" });
            } else {
              res.status(400);
              throw new Error("Dữ liệu chưa đúng định dạng");
            }
          }
        }
      });
    }
  })
);

router.delete(
  "/",
  protect,
  admin,
  expressAsyncHandler(async (req, res) => {
    try {
      await Product.deleteMany({});
      await ImportProductDetail.deleteMany({});
      await ImportProduct.deleteMany({});
      await ImageProduct.deleteMany({});
      res.status(201).json({ message: "Xóa tất cả sản phẩm thành công" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);
module.exports = router;
