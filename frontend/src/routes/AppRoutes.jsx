import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";

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

    </Routes>
  );
}

export default AppRoutes;