import Product from './Product';
import Salesperson from './Salesperson';

export default interface RemunerationMonthlyReport {
  product: Product;
  salesperson: Salesperson;
  amount: number;
}
