import Product from './Product';

export default interface Remuneration {
  id: number;
  year: number;
  month: number;
  product: Product;
  amount: number;
}
