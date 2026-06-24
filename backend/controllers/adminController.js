import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getAllOrders = async (
    req,
    res
) => {

    try {

        const orders = await Order.find()

            .populate("user", "name")
            .populate(
                "products.product",
                "name image"
            )

            .sort({
                createdAt: -1,
            });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({
                message: "Order not found",
            });

        }

        order.orderStatus =
            req.body.orderStatus;

        if (
            req.body.orderStatus ===
            "Delivered"
        ) {

            order.deliveredAt =
                Date.now();

        }

        await order.save();

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getAllFeedbacks = async (
    req,
    res
) => {

    try {

        const feedbacks =
            await Order.find({
                feedbackGiven: true
            })
            .populate(
                "user",
                "name email"
            )
            .populate(
                "products.product",
                "name"
            )
            .sort({
                createdAt: -1
            });

        res.json(feedbacks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};