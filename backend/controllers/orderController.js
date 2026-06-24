import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {

    try {

        const {
            products,
            totalPrice,
            paymentMethod,
            shippingInfo
        } = req.body;

        const order = await Order.create({

            user: req.user._id,

            products,

            shippingInfo,

            totalPrice,

            paymentMethod

        });

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user._id

        })

            .populate(
                "products.product",
                "name image price"
            )

            .sort({
                createdAt: -1
            });

        res.json(orders);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                message: "Order not found",
            });

        }

        if (
            order.orderStatus !== "Order Placed" &&
            order.orderStatus !== "Confirmed"
        ) {

            return res.status(400).json({
                message:
                    "Order cannot be cancelled now",
            });

        }

        order.orderStatus = "Cancelled";

        order.cancelledAt = Date.now();

        await order.save();

        res.json({
            message:
                "Order cancelled successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)

            .populate(
                "products.product",
                "name image price"
            );

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const downloadInvoice = async (
    req,
    res
) => {

    const order = await Order.findById(
        req.params.id
    ).populate(
        "products.product",
        "name price"
    );

    if (!order) {

        return res.status(404).json({
            message: "Order not found"
        });

    }

    res.json(order);

};

export const submitFeedback = async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                message: "Order not found",
            });

        }

        order.rating = req.body.rating;

        order.feedback = req.body.feedback;

        order.feedbackGiven = true;

        await order.save();

        // Update Product Rating

        const productId =
            order.products[0].product;

        const reviews =
            await Order.find({
                "products.product": productId,
                feedbackGiven: true,
            });

        const totalRating =
            reviews.reduce(
                (acc, item) =>
                    acc + item.rating,
                0
            );

        const averageRating =
            totalRating /
            reviews.length;

        await Product.findByIdAndUpdate(
            productId,
            {
                rating:
                    averageRating.toFixed(1),
            }
        );

        res.json({
            message:
                "Feedback submitted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const returnOrder = async (
    req,
    res
) => {

    try {

        const order =
            await Order.findById(
                req.params.id
            );

        if (!order) {

            return res.status(404).json({
                message:
                    "Order not found",
            });

        }

        if (
            order.orderStatus !==
            "Delivered"
        ) {

            return res.status(400).json({
                message:
                    "Only delivered orders can be returned",
            });

        }

        order.orderStatus =
            "Returned";

        order.returnReason =
            req.body.reason;

        order.returnedAt =
            Date.now();

        await order.save();

        res.json({
            message:
                "Return request submitted",
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message,
        });

    }

};