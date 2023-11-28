interface ICoffee {
  id: number;
  tags: string[];
  name: string;
  description: string;
  photo: string;
  price: number;
}

interface ICoffeeProps {
  coffee: ICoffee;
}

export type { ICoffee, ICoffeeProps };