const express = require("express");
const staffController = require("../controllers/StaffController");
const router = express.Router();
const { protect } = require("../middleware/AuthMiddleware");
router.post("/", protect,staffController.add);
router.post("/login", staffController.login);
router.get("/", protect,  staffController.getAll);
router.get("/:id", protect, staffController.get);
router.put("/:id", protect, staffController.update);
router.delete("/:id", protect, staffController.delete);


module.exports = router;
