import express from "express";

import { getDashboardStats, getAllOrders, updateOrderStatus, getAllFeedbacks }
from "../controllers/adminController.js";

import { protect }
from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  getDashboardStats
);

router.get(
  "/orders",
  protect,
  getAllOrders
);

router.put(
    "/orders/:id",
    protect,
    updateOrderStatus
);

router.get(
    "/feedbacks",
    protect,
    getAllFeedbacks
);

export default router;