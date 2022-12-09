const express = require("express");
const { protect  } = require("../middleware/AuthMiddleware");

const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.delete("/:id",protect, ProductController.deleteReview);



module.exports = router;
