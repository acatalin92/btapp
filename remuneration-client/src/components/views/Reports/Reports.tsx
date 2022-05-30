import React, { useState, useCallback, useEffect } from 'react';
import '../views.css';
import View from '../../View';
import { Table, Head, Body, Row, Cell } from '../../Table';
import { API_REMUNERATIONS_MONTHLY_REPORT_URL } from '../../..';
import { getParsedMonthlyReportData } from './helpers';
import FiltersBar from '../../FiltersBar';
import { MONTH, YEAR } from '../../../utilities/time';

type ParsedMonthlyReportData = ReturnType<typeof getParsedMonthlyReportData>;

const Reports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [data, setData] = useState<ParsedMonthlyReportData | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    fetch(`${API_REMUNERATIONS_MONTHLY_REPORT_URL}/${year}/${month}`)
      .then(response => response.json())
      .then(data => setData(getParsedMonthlyReportData(data)))
      .finally(() => setIsLoading(false));
  }, [month, year]);

  useEffect(() => {
    if (!data) {
      loadData();
    }
  }, [data, loadData]);

  useEffect(() => {
    loadData();
  }, [month, year, loadData]);

  const handleMonthChange = useCallback((month: number) => {
    setMonth(month);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setYear(year);
  }, []);

  return (
    <View isLoading={isLoading} isEmpty={!isLoading && !data}>
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
              <Cell>Product</Cell>
              {data?.salespersons.map((salesperson, i) => (
                <Cell key={i}>{salesperson.name}</Cell>
              ))}
            </Row>
          </Head>
          <Body>
            {data?.products.map((product, i) => (
              <Row key={i}>
                <Cell>{product.name}</Cell>
                {data.salespersons.map((salesperson, i) => (
                  <Cell key={i}>
                    {product.salespersonIdToAmount[salesperson.id] || ''}
                  </Cell>
                ))}
              </Row>
            ))}
          </Body>
        </Table>
      </div>
    </View>
  );
};

export default Reports;
