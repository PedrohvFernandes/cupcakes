interface ICoffee {
  id: string;
  tags: string[];
  name: string;
  description: string;
  price: number;
  size: string;
  photo: string[];
}

interface ICoffeeProps {
  coffee: ICoffee;
}

export type { ICoffee, ICoffeeProps };