const express = require("express");
const staffTypeController = require("../controllers/staffTypeController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/", protect, admin,staffTypeController.add);
router.get("/", protect,  staffTypeController.getAll);
router.get("/:id", protect, staffTypeController.get);
router.put("/:id", protect, staffTypeController.update);
router.delete("/:id",protect, staffTypeController.delete);


module.exports = router;
