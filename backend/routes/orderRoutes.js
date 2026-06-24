import express from "express";

import {
    createOrder,
    getMyOrders,
    cancelOrder,
    getOrderById,
    downloadInvoice,
    submitFeedback,
    returnOrder,
} from "../controllers/orderController.js";

import {
    protect
} from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
    "/",
    protect,
    createOrder
);

router.get(
    "/myorders",
    protect,
    getMyOrders
);

router.put(
    "/:id/cancel",
    protect,
    cancelOrder
);

router.get(
    "/:id",
    protect,
    getOrderById
);

router.get(
    "/:id/invoice",
    protect,
    downloadInvoice
);

router.put(
    "/:id/feedback",
    protect,
    submitFeedback
);

router.put(
    "/:id/return",
    protect,
    returnOrder
);

export default router;