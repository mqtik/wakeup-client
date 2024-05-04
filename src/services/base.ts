import { Food, Restaurant } from "../types/base";

// Yeah, I know axios is a thing
export const getRestaurants = async (page: number): Promise<Restaurant[]> =>
  await (await fetch(`http://localhost:3000/restaurants?page=${page}`)).json();

export const getMenu = async (): Promise<Food[]> =>
  await (await fetch("http://localhost:3000/menu")).json();
