import { useState, useEffect } from "react";
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

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  return (
    <>
      <Navbar cartItems={cartItems} />

      <AppRoutes
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <Footer />
    </>
  );
}

export default App;