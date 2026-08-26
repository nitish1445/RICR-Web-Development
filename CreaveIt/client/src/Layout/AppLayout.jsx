import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/CartContext";

const AppLayout = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default AppLayout;
