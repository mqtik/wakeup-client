import Button from "@mui/material/Button";
import React, { ReactNode, useMemo, useState } from "react";
import { Food, Restaurant } from "../../types/base";
import { Wrapper, modalContentBox } from "./styles";
import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { getMenu } from "../../services/base";
import { Add, Close, Remove } from "@mui/icons-material";
import { useCart } from "../../App";

type Props = {
  item: Restaurant;
  trigger?: (open: () => void) => ReactNode;
};

const MenuCard = ({ item }: { item: Food }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const cartItemsAmounts = useMemo(() => {
    return cartItems.reduce<Partial<Record<string, number>>>(
      (obj, { id, amount }) => {
        obj[id] = amount;
        return obj;
      },
      {}
    );
  }, [cartItems]);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "transparent",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ color: "#999" }}
          >
            {/* Should've use Big.js or a currency formatter here */}$
            {item.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <ButtonGroup>
            <Button onClick={() => removeFromCart(item.id)}>
              <Remove />
            </Button>
            <Button>{cartItemsAmounts?.[item.id] || 0}</Button>
            <Button onClick={() => addToCart(item)}>
              <Add />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, margin: "6px 10px 0 0" }}
        image={item.picture}
        alt={item.name}
      />
    </Card>
  );
};

const RestaurantModal: React.FC<Props> = ({ item, trigger }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const {
    data: menuList,
    isLoading: isLoadingMenu,
    error: errorMenu,
  } = useQuery<Food[]>("products", getMenu);

  return (
    <>
      {trigger?.(openModal)}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Wrapper>
          <Box sx={modalContentBox}>
            <div className="title">
              <Typography>{item.name}'s Menu</Typography>
              <IconButton onClick={() => setModalOpen(false)}>
                <Close style={{ color: "#fff" }} />
              </IconButton>
            </div>
            {isLoadingMenu && <CircularProgress />}
            {!!errorMenu && (
              <Typography>Oops, something went wrong here!</Typography>
            )}
            <Box sx={{ overflow: "auto", maxHeight: 400 }}>
              {menuList
                ?.filter((menuItem) => menuItem.restaurantId === item.id)
                ?.map((menuItem) => (
                  <MenuCard key={menuItem.id} item={menuItem} />
                ))}
            </Box>
          </Box>
        </Wrapper>
      </Modal>
    </>
  );
};

export default RestaurantModal;
