const mongoose = require("mongoose");

const importDetailSchema = mongoose.Schema(
  {
    importId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImportProduct",
    },
    importPrice: {
      type: Number,
      required: true,
    },
    countInStock: { type: Number, default: 0 },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ImportProductDetail = mongoose.model(
  "ImportProductDetail",
  importDetailSchema
);
module.exports = ImportProductDetail;
