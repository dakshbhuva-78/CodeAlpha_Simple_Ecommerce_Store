import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
    },

    image: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0,
    },

    discount: {
      type: String,
    },

    stock: {
      type: String,
      default: "In Stock",
    },

    description: {
      type: String,
    },

    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;