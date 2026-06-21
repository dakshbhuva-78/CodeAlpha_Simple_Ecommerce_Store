import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import OrderSuccess from "../pages/OrderSuccess";
import Checkout from "../pages/Checkout";

function AppRoutes({ cartItems, setCartItems }) {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/productdetails/:id" element={<ProductDetails
        cartItems={cartItems}
        setCartItems={setCartItems}
      />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
      />} />

      <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/ordersuccess" element={<OrderSuccess />} />

    </Routes>
  );
}

export default AppRoutes;