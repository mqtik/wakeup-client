import Button from "@mui/material/Button";
import React from "react";
import { Food } from "../../types/base";
import { Wrapper } from "./cartItem.styles";
import { ButtonGroup } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

type Props = {
  item: Food;
  addToCart: (clickedItem: Food) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.name}</h3>
        <div className="information">
          <p>Price ${item.price}</p>
          <p>Total ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <ButtonGroup>
            <Button onClick={() => removeFromCart(item.id)}>
              <Remove />
            </Button>
            <Button>{item.amount}</Button>
            <Button onClick={() => addToCart(item)}>
              <Add />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <img src={item.picture} alt={item.name} />
    </Wrapper>
  );
};

export default CartItem;
