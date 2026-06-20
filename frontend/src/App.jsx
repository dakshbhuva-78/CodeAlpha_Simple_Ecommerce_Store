import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Navbar />

      <AppRoutes
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <Footer />
    </>
  );
}

export default App;