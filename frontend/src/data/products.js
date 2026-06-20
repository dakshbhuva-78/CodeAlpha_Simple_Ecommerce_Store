import laptop from "../assets/products/laptop.webp";
import phone from "../assets/products/smartphone.webp";
import watch from "../assets/products/smartwatch.webp";

const products = [
  {
    id: 1,
    name: "MacBook Pro",
    category: "Laptop",
    price: 65000,
    oldPrice: 75000,
    rating: 4.9,
    discount: "15% OFF",
    stock: "In Stock",

    description:
      "Powerful Apple laptop built for developers, designers and professionals.",

    features: [
      "M3 Processor",
      "16GB RAM",
      "512GB SSD",
      "Retina Display",
      "18 Hours Battery"
    ],

    image: laptop,
  },

  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Phone",
    price: 75000,
    oldPrice: 85000,
    rating: 4.8,
    discount: "20% OFF",
    stock: "In Stock",

    description:
      "Latest Apple smartphone with powerful performance and amazing camera.",

    features: [
      "A17 Pro Chip",
      "48MP Camera",
      "Titanium Design",
      "USB-C",
      "Face ID"
    ],

    image: phone,
  },

  {
    id: 3,
    name: "Apple Watch",
    category: "Watch",
    price: 13000,
    oldPrice: 16000,
    rating: 4.8,
    discount: "20% OFF",
    stock: "Limited Stock",

    description:
      "Smart fitness and health tracking watch for everyday use.",

    features: [
      "Heart Rate Monitor",
      "GPS",
      "Fitness Tracking",
      "Water Resistant",
      "Bluetooth Calling"
    ],

    image: watch,
  },
];

export default products;