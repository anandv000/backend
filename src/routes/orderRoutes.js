const express = require("express");
const router  = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateStep,
  deleteOrder,
  getWastageReport,
} = require("../controllers/orderController");

// No protect middleware — open routes
router.get("/wastage", getWastageReport);
router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrderById).delete(deleteOrder);
router.patch("/:id/step", updateStep);

module.exports = router;
