import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("CraveIt Cart");
      return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
      return null;
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (cart?.cartItem?.length > 0) {
      localStorage.setItem("CraveIt Cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("CraveIt Cart");
    }
  }, [cart]);

  const addToCart = (newItem) => {
    setCart((currentCart) => {
      // First item
      if (!currentCart) {
        return {
          restaurantID: newItem.restaurantID,
          cartItem: [
            {
              ...newItem,
              quantity: 1,
            },
          ],
          cartValue: Number(newItem.price),
        };
      }

      // Prevent multiple restaurant orders
      if (currentCart.restaurantID !== newItem.restaurantID) {
        toast.error(
          "Please clear your cart before ordering from another restaurant.",
        );
        return currentCart;
      }

      const existingItem = currentCart.cartItem.find(
        (item) => item._id === newItem._id,
      );

      // If item already exists, increase quantity
      if (existingItem) {
        return {
          ...currentCart,
          cartItem: currentCart.cartItem.map((item) =>
            item._id === newItem._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
          cartValue: Number(currentCart.cartValue) + Number(newItem.price),
        };
      }

      // Add new item
      return {
        ...currentCart,
        cartItem: [
          ...currentCart.cartItem,
          {
            ...newItem,
            quantity: 1,
          },
        ],
        cartValue: Number(currentCart.cartValue) + Number(newItem.price),
      };
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (itemId) => {
    setCart((currentCart) => {
      if (!currentCart) return null;
      const item = currentCart.cartItem.find((item) => item._id === itemId);
      if (!item) return currentCart;

      return {
        ...currentCart,
        cartItem: currentCart.cartItem.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
        cartValue: Number(currentCart.cartValue) + Number(item.price),
      };
    });
  };

  const decreaseQuantity = (itemId) => {
    setCart((currentCart) => {
      if (!currentCart) return null;
      const item = currentCart.cartItem.find((item) => item._id === itemId);

      if (!item) return currentCart;

      // Remove if quantity becomes 0
      if (item.quantity <= 1) {
        const updatedItems = currentCart.cartItem.filter(
          (item) => item._id !== itemId,
        );

        if (updatedItems.length === 0) {
          return null;
        }
        return {
          ...currentCart,
          cartItem: updatedItems,
          cartValue: Number(currentCart.cartValue) - Number(item.price),
        };
      }

      return {
        ...currentCart,
        cartItem: currentCart.cartItem.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),
        cartValue: Number(currentCart.cartValue) - Number(item.price),
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart((currentCart) => {
      if (!currentCart) return null;

      const item = currentCart.cartItem.find((item) => item._id === itemId);
      if (!item) return currentCart;

      const updatedItems = currentCart.cartItem.filter(
        (item) => item._id !== itemId,
      );

      if (updatedItems.length === 0) {
        return null;
      }

      return {
        ...currentCart,
        cartItem: updatedItems,
        cartValue:
          Number(currentCart.cartValue) -
          Number(item.price) * Number(item.quantity),
      };
    });
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("CraveIt Cart");
    toast.success("Cart cleared");
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const cartCount =
    cart?.cartItem?.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0,
    ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,

        openCart,
        closeCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
