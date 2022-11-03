const mongoose = require("mongoose");

const favoriteProductSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const FavoriteProduct = mongoose.model(
  "FavoriteProduct",
  favoriteProductSchema
);

module.exports = FavoriteProduct;
