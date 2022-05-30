import React, { useState, useCallback, useEffect } from 'react';
import '../views.css';
import './Sales.css';
import View from '../../View';
import Sale from '../../../models/Sale';
import { Table, Head, Body, Row, Cell } from '../../Table';
import { API_SALES_URL } from '../../..';
import Button from '../../Button';
import FiltersBar from '../../FiltersBar';
import { MONTH, YEAR } from '../../../utilities/time';
import SalesEntryEditor, { SalesEntryEditorResult } from './SalesEntryEditor';

const Sales: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [data, setData] = useState<Sale[]>([]);
  const [filteredData, setFilteredData] = useState<Sale[]>([]);
  const [isEntryEditorActive, setIsEntryEditorActive] = useState(false);
  const [entryEditorResult, setEntryEditorResult] = useState<SalesEntryEditorResult | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    fetch(API_SALES_URL)
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

  const handleEntryEditorTriggerClick = useCallback(() => {
    setIsEntryEditorActive(!isEntryEditorActive);
  }, [isEntryEditorActive]);

  const handleEntryEditorChange = useCallback((result: SalesEntryEditorResult) => {
    setEntryEditorResult(result);
  }, []);

  const handleEntryEditorSaveClick = useCallback(() => {
    const result = entryEditorResult as SalesEntryEditorResult;
    setEntryEditorResult(null);
    fetch(API_SALES_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.entry),
    })
      .then(response => response.json())
      .then(data => {
        setIsEntryEditorActive(false);
        setData(data);
      })
      .catch(() => setEntryEditorResult(result));
  }, [entryEditorResult]);

  return (
    <View
      className="sales"
      isLoading={isLoading}
      isEmpty={!isLoading && !filteredData.length}
    >
      <div data-persistent className="filters-container">
        <div className="edit-entry-buttons">
          <Button
            className="edit-entry-trigger"
            active={isEntryEditorActive}
            onClick={handleEntryEditorTriggerClick}
          >
            Modify entry
          </Button>
          {isEntryEditorActive && (
            <Button
              className="edit-entry-save"
              disabled={!entryEditorResult || !entryEditorResult.isValid}
              onClick={handleEntryEditorSaveClick}
            >
              Save
            </Button>
          )}
        </div>
        <FiltersBar
          month={month}
          year={year}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
      </div>
      {isEntryEditorActive && (
        <div data-persistent className="box entry-editor-container">
          <SalesEntryEditor sales={data} onChange={handleEntryEditorChange} />
        </div>
      )}
      <div className="box table-container">
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
            {filteredData.map((sale, i) => (
              <Row key={i}>
                <Cell>{sale.year}</Cell>
                <Cell>{sale.month}</Cell>
                <Cell>{sale.salesperson.name}</Cell>
                <Cell>{sale.product.name}</Cell>
                <Cell>{sale.quantity}</Cell>
              </Row>
            ))}
          </Body>
        </Table>
      </div>
    </View>
  );
};

export default Sales;
