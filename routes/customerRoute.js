const express = require("express");

const router = express.Router();
const customerController = require("../controllers/customerController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/register", customerController.register);
router.post("/login", customerController.login);
router.get("/:id", protect, customerController.get);
router.get("/:id/orders", protect, customerController.getOrders);

router.get("/", protect, admin, customerController.getAll);

router.put("/:id", protect, customerController.update);

module.exports = router;
