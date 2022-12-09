const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

const ProductController = require("../controllers/ProductController");
router.get("/", ProductController.getAll);
router.get("/admin", protect, ProductController.getAllByAdmin);
router.get("/:id", ProductController.getSingle);

router.delete("/:id", protect, ProductController.delete);
router.patch("/:id", protect, ProductController.edit);
router.post("/:id/review", protect, ProductController.addReview);
router.get("/:id/review", protect, ProductController.getAllReview);
router.post("/", protect, ProductController.add);

module.exports = router;
