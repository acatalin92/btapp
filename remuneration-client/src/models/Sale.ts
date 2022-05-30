import Salesperson from './Salesperson';
import Product from './Product';

export default interface Sale {
  id: number;
  year: number;
  month: number;
  salesperson: Salesperson;
  product: Product;
  quantity: number;
}
