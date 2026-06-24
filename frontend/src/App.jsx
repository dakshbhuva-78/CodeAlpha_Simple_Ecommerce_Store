import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  return (
    <>
      {!isAdminPage && <Navbar cartItems={cartItems} />}

      <AppRoutes
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;