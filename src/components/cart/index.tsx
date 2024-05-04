import CartItem from "./cartItem";
import React from "react";
import { Food } from "../../types/base";
import { Wrapper } from "./styles";
import { useCart } from "../../App";

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const calculateTotal = (items: Food[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>You did not place any orders.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
