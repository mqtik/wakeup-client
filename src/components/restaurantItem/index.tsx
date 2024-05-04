import Button from "@mui/material/Button";
import React from "react";
import { Restaurant } from "../../types/base";
import { Wrapper } from "./styles";
import RestaurantModal from "../restaurantModal";

type Props = {
  item: Restaurant;
};

const Item: React.FC<Props> = ({ item }) => (
  <Wrapper>
    <div className="restaurantInfo">
      <img src={item.picture} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <RestaurantModal
          item={item}
          trigger={(open) => (
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => open()}
            >
              View Menu
            </Button>
          )}
        />
      </div>
    </div>
  </Wrapper>
);

export default Item;
