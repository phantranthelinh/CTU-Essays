const express = require("express");
const staffController = require("../controllers/staffController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/", protect,admin,staffController.add);
router.post("/login", staffController.login);
router.get("/", protect, admin, staffController.getAll);
router.get("/:id", protect, staffController.get);
router.put("/:id", protect, staffController.update);
router.delete("/:id", protect, staffController.delete);


module.exports = router;
