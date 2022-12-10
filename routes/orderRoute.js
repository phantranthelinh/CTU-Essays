const express = require("express");

const router = express.Router();
const orderController = require("../controllers/OrderController");
const { protect } = require("../middleware/AuthMiddleware");

router.post("/", protect, orderController.create);
router.get("/", protect,  orderController.adminGetAllOrder);
router.get("/:id", protect, orderController.detail);
router.put("/cancelled/:id",  orderController.isCancelled);
router.put("/:id/delivered", protect, orderController.isDelivered);

router.delete("/", protect,  orderController.deleteAllOrder);

module.exports = router;
