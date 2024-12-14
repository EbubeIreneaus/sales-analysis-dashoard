export type Product = {
  name: string;

  quantity: number;

  id: number;

  unit_price: number;

  market_price: number;

  image?: string;

  long_title?: string;

  desc?: string;

  category?: string;

  sub_category?: string;

  store: boolean;
};
