const express = require("express");
const { protect ,admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.delete("/:id",protect,admin, ProductController.deleteReview);



module.exports = router;
