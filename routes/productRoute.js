const express = require("express");
const { protect ,admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

const ProductController = require("../controllers/ProductController");
router.get("/",  ProductController.getAll);
router.get("/admin", protect , admin ,ProductController.getAllByAdmin);
router.get("/:id", ProductController.getSingle);

router.delete("/:id",protect,admin, ProductController.delete);
router.patch("/:id", protect , admin ,ProductController.edit);
router.post("/:id/review", protect, ProductController.addReview);
router.get("/:id/review", protect, ProductController.getAllReview);    
router.post("/", protect , admin ,ProductController.add);



module.exports = router;
