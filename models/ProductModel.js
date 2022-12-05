var URLSlug = require("mongoose-slug-generator");
const mongoose = require("mongoose");
mongoose.plugin(URLSlug);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, slug: "name" },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, required: true, default: 0 },
    importProductDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImportProductDetail",
    },
    importId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImportProduct",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageProduct",
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
