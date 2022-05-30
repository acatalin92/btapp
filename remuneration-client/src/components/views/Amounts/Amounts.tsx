import React, { useState, useCallback, useEffect } from 'react';
import '../views.css';
import View from '../../View';
import Remuneration from '../../../models/Remuneration';
import { Table, Head, Body, Row, Cell } from '../../Table';
import { API_REMUNERATIONS_URL } from '../../..';
import FiltersBar from '../../FiltersBar';
import { MONTH, YEAR } from '../../../utilities/time';

const Amounts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [data, setData] = useState<Remuneration[]>([]);
  const [filteredData, setFilteredData] = useState<Remuneration[]>([]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    fetch(API_REMUNERATIONS_URL)
      .then(response => response.json())
      .then(data => setData(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!data.length) {
      loadData();
    }
  }, [data, loadData]);

  useEffect(() => {
    setFilteredData(data.filter(d => d.month === month && d.year === year));
  }, [data, year, month]);

  const handleMonthChange = useCallback((month: number) => {
    setMonth(month);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setYear(year);
  }, []);

  return (
    <View isLoading={isLoading} isEmpty={!isLoading && !filteredData.length}>
      <div data-persistent className="filters-container">
        <FiltersBar
          month={month}
          year={year}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
      </div>
      <div className="box table-container">
        <Table>
          <Head>
            <Row>
              <Cell>Year</Cell>
              <Cell>Month</Cell>
              <Cell>Product</Cell>
              <Cell>Amount</Cell>
            </Row>
          </Head>
          <Body>
            {filteredData.map((remuneration, i) => (
              <Row key={i}>
                <Cell>{remuneration.year}</Cell>
                <Cell>{remuneration.month}</Cell>
                <Cell>{remuneration.product.name}</Cell>
                <Cell>{remuneration.amount}</Cell>
              </Row>
            ))}
          </Body>
        </Table>
      </div>
    </View>
  );
};

export default Amounts;
