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
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import AdminOrders from "../pages/AdminOrders";
import LeaveFeedback from "../pages/LeaveFeedback";
import ReturnOrder from "../pages/ReturnOrder";
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../components/AdminLayout";
import AdminFeedbacks from "../pages/AdminFeedbacks";
import VerifyOtp from "../pages/VerifyOtp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
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

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />

      <Route
        path="/feedback/:id"
        element={
          <ProtectedRoute>
            <LeaveFeedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/feedbacks"
        element={
          <AdminRoute>
            <AdminFeedbacks />
          </AdminRoute>
        }
      />

      <Route
        path="/return-order/:id"
        element={
          <ProtectedRoute>
            <ReturnOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <VerifyOtp />
        }
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />


    </Routes>


  );
}

export default AppRoutes;