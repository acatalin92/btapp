import React, { useState, useCallback, useEffect } from 'react';
import './SalesEntryEditor.css';
import Sale from '../../../models/Sale';
import { Table, Head, Body, Row, Cell } from '../../Table';
import { API_PRODUCTS_URL, API_SALESPERSONS_URL } from '../../..';
import { MONTH, YEAR } from '../../../utilities/time';
import Salesperson from '../../../models/Salesperson';
import Product from '../../../models/Product';

export interface SalesEntryEditorResult {
  isValid: boolean;
  entry: { [key: string]: any };
}

interface Props {
  sales: Sale[];
  onChange: (result: SalesEntryEditorResult) => void;
}

const SalesEntryEditor: React.FC<Props> = ({ sales, onChange }) => {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [year, setYear] = useState<number>(YEAR);
  const [month, setMonth] = useState<number>(MONTH);
  const [salesperson, setSalesperson] = useState<Salesperson | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const isEnabled = products.length && salespersons.length;

  useEffect(() => {
    if (!salespersons.length) {
      fetch(API_SALESPERSONS_URL)
      .then(response => response.json())
      .then(data => setSalespersons(data || []));
    }
  }, [salespersons]);

  useEffect(() => {
    if (!products.length) {
      fetch(API_PRODUCTS_URL)
      .then(response => response.json())
      .then(data => setProducts(data || []));
    }
  }, [products]);

  useEffect(() => {
    const target = sales && salesperson && product
      ? sales.find(s => (
          s.year === year &&
          s.month === month &&
          s.salesperson.id === salesperson.id &&
          s.product.id === product.id
        ))
      : null;
    setQuantity(target ? target.quantity : 0);
    setId(target ? target.id : 0);
  }, [sales, year, month, salesperson, product]);

  useEffect(() => {
    onChange && onChange({
      isValid: !!year && !!month && !!salesperson && !!product && !!quantity,
      entry: {
        id,
        year,
        month,
        salesperson: salesperson || null,
        product: product || null,
        quantity,
      },
    });
  }, [year, month, salesperson, product, quantity, id, onChange]);

  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(+e.target.value);
  }, []);

  const handleMonthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(+e.target.value);
  }, []);

  const handleSalespersonChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const target = value !== '' ? salespersons.find(s => s.id === +value) : null;
    setSalesperson(target ? target : null);
  }, [salespersons]);

  const handleProductChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const target = value !== '' ? products.find(p => p.id === +value) : null;
    setProduct(target ? target : null);
  }, [products]);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
  }, []);

  return (
    <div className="sales-entry-editor">
      <Table>
        <Head>
          <Row>
            <Cell>Year</Cell>
            <Cell>Month</Cell>
            <Cell>Salesperson</Cell>
            <Cell>Product</Cell>
            <Cell>Quantity</Cell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>
              <input
                className="year"
                type="number"
                min={1000}
                max={9999}
                value={year}
                disabled={!isEnabled}
                onChange={handleYearChange}
              />
            </Cell>
            <Cell>
              <input
                className="month"
                type="number"
                min={1}
                max={12}
                value={month}
                disabled={!isEnabled}
                onChange={handleMonthChange}
              />
            </Cell>
            <Cell>
              <select
                value={salesperson !== null ? salesperson.id : ''}
                onChange={handleSalespersonChange}
                disabled={!isEnabled}
              >
                <option value="">Select...</option>
                {salespersons.map((salesperson, i) => (
                  <option key={i} value={salesperson.id}>{salesperson.name}</option>
                ))}
              </select>
            </Cell>
            <Cell>
              <select
                value={product !== null ? product.id : ''}
                onChange={handleProductChange}
                disabled={!isEnabled}
              >
                <option value="">Select...</option>
                {products.map((product, i) => (
                  <option key={i} value={product.id}>{product.name}</option>
                ))}
              </select>
            </Cell>
            <Cell>
              <input
                className="quantity"
                type="number"
                min={0}
                value={quantity}
                disabled={!isEnabled}
                onChange={handleQuantityChange}
              />
            </Cell>
          </Row>
        </Body>
      </Table>
    </div>
  );
};

export default SalesEntryEditor;
