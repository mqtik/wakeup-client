export interface Document {
  id: number;
}
export interface Food extends Document {
  name: string;
  price: number;
  picture: string;
  restaurantId: number;
  amount: number;
}

export interface Restaurant extends Document {
  name: string;
  description: string;
  address: string;
  picture: string;
}
