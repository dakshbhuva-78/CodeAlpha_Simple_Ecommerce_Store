import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import OrderSuccess from "../pages/OrderSuccess";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import Invoice from "../pages/Invoice";
import ProtectedRoute from "../components/ProtectedRoute";

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

      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </ProtectedRoute>} />

      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </ProtectedRoute>
      } />
      <Route path="/ordersuccess" element={<OrderSuccess />} />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-details/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoice/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />

    </Routes>


  );
}

export default AppRoutes;