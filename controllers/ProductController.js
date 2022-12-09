const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const ImportProduct = require("../models/ImportProductModel");
const ImportProductDetail = require("../models/ImportProductDetailModel");
const ImportDetail = require("../models/ImportProductDetailModel");
const ImageProduct = require("../models/ImageModel");
const ReviewProduct = require("../models/ReviewModel");
module.exports = {
  getSingle: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate({
          path: "image",
          select: "base64",
        })
        .populate({
          path: "importProductDetail",
          select: "importPrice countInStock",
        });
      res.json(product);
    } catch (err) {
      res.status(404);
      throw new Error("Không tìm thấy sản phẩm");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const pageSize = 6;
      const page = Number(req.query.pageNumber) || 1;
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
      const count = await Product.countDocuments({ ...keyword });

      const products = await Product.find({ ...keyword })
        .populate({ path: "image", select: "base64" })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });
      res.status(200).json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }),
  delete: asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      await ImportDetail.findOneAndDelete({ productId: req.params.id });
      await ImageProduct.findOneAndDelete({ productId: req.params.id });
      res.json({ message: "Xoá sản phẩm thành công" });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy sản phẩm");
    }
  }),
  add: asyncHandler(async (req, res) => {
    const { name, salePrice, importPrice, description, image, quantity } =
      req.body;
    const productExits = await ImportProductDetail.findOne({ name });
    if (productExits) {
      res.status(404);
      throw new Error("Sản phẩm đã tồn tại");
    } else {
      const importProduct = new ImportProduct({
        userId: req.user._id,
      });
      if (importProduct) {
        const createdImportProduct = await importProduct.save();

        const imageProduct = new ImageProduct({
          productId: createdImportProduct._id,
          base64: image,
        });
        const createdImageProduct = await imageProduct.save();
        const importProductDetail = new ImportProductDetail({
          importId: createdImportProduct._id,
          importPrice: importPrice,
          countInStock: quantity,
          name: name,
        });
        await importProductDetail.save();

        if (importProductDetail) {
          const product = new Product({
            name,
            salePrice: salePrice,
            description,
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
  }),
  edit: asyncHandler(async (req, res) => {
    const { name, salePrice, description, importPrice, image, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const imageProduct = await ImageProduct.findById(product.image);
      const importProductDetail = await ImportProductDetail.findById(
        product.importProductDetail
      );
      if (imageProduct && importProductDetail) {
        product.name = name || product.name;
        product.price = salePrice || product.price;
        product.description = description || product.description;
        importProductDetail.importPrice =
          importPrice || importProductDetail.importPrice;
        imageProduct.base64 = image || imageProduct.base64;

        await imageProduct.save();
        await product.save();
        await importProductDetail.save();

        res.status(200).json({ message: "Chỉnh sửa sản phẩm thành công" });
      } else {
        return;
      }
    } else {
      res.status(400);
      throw new Error("Không tìm thấy sản phẩm");
    }
  }),
  addReview: asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const newReview = new ReviewProduct({
        userId: req.user._id,
        comment: comment,
        rating: Number(rating),
        productId: product._id,
      });
      await newReview.save();
      const reviews = await ReviewProduct.find({ productId: product._id });
      let totalNumReviews = 0;
      let totalRating = 0;

      for (let i = 0; i < reviews.length; i++) {
        //TODO: Calculate numReviews
        totalNumReviews++;
        //TODO: calculate rating
        totalRating += reviews[i].rating;
      }
      product.numReviews = totalNumReviews;
      if (totalRating === 0) {
        product.rating = 0;
      }
      product.rating = Number(totalRating / reviews.length).toFixed(2);
      await product.save();

      res.status(200).json({ Message: "Đánh giá sản phẩm thành công" });
    } else {
      res.status(405).json("Không tìm thấy sản phẩm");
    }
  }),
  getAllReview: asyncHandler(async (req, res) => {
    const reviews = await ReviewProduct.find({ productId: req.params.id })
      .populate({ path: "userId", select: "name" })
      .sort({ createdAt: -1 });
    if (reviews) {
      res.status(200).json({ reviews });
    } else {
      res.status(404).json("Không tìm đánh giá của sản phẩm");
    }
  }),
  deleteReview: asyncHandler(async (req, res) => {
    const review = await ReviewProduct.findById(req.params.id);
    if (review) {
      const reviews = await ReviewProduct.find({ productId: review.productId });
      //TODO: delele all review
      // await ReviewProduct.remove({})
      const product = await Product.findById(review.productId);

      await review.deleteOne();

      let totalNumReviews = 0;
      let totalRating = 0;
      for (let i = 0; i < reviews.length; i++) {
        //TODO: Calculate numReviews
        totalNumReviews++;
        //TODO: calculate rating
        totalRating += reviews[i].rating;
      }
      product.numReviews = totalNumReviews;
      if (totalRating === 0) {
        product.rating = 0;
      }
      product.rating = Number(totalRating / reviews.length).toFixed(2);
      await product.save();
      res.status(200).json({ message: "Xóa thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }
  }),
  getAllByAdmin: asyncHandler(async (req, res) => {
    const products = await Product.find({})
      .sort({ _id: -1 })
      .populate({ path: "image", select: "base64" });
    res.json(products);
  }),
};
