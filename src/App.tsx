import { createContext, useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Cart from "./components/cart";
import { Wrapper, StyledButton } from "./App.styles";
import { AddShoppingCart } from "@mui/icons-material";
import { Food, Restaurant } from "./types/base";
import RestaurantItem from "./components/restaurantItem";
import { getRestaurants } from "./services/base";
import { useInView } from "react-intersection-observer";

// This should be in a /context folder
interface CartContextProps {
  cartItems: Food[];
  addToCart: (clickedItem: Food) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContext");
  }
  return context;
};
// End context

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Food[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [enoughScrolling, setEnoughScrolling] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    getRestaurants(page)
      .then((res) => {
        if (res?.length === 0) {
          setEnoughScrolling(true);
          return;
        }
        setRestaurants((rests) => rests.concat(res ?? []));
      })
      .catch(() => alert("Mmh, something went wrong getting restaurants.."));
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

  const getTotalItems = (items: Food[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: Food) => {
    setCartItems((prev) => {
      // Is the order already in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the order is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveToCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.price === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Food[])
    );
  };

  if (restaurants?.length === 0) return <LinearProgress />;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveToCart,
      }}
    >
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCart />
          </Badge>
        </StyledButton>
        <Grid container spacing={1}>
          {restaurants?.map((item) => (
            <Grid item key={item.id} xs={12} sm={12}>
              <RestaurantItem item={item} />
            </Grid>
          ))}
        </Grid>
        <div
          className="loading"
          ref={ref}
          style={{ display: enoughScrolling ? "none" : "unset" }}
        >
          <h4>Loading...</h4>
        </div>
      </Wrapper>
    </CartContext.Provider>
  );
};

export default App;
