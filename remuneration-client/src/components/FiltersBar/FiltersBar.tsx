import React, { useCallback } from 'react';
import './FiltersBar.css';
import { MONTH, YEAR } from '../../utilities/time';

interface Props {
  month?: number;
  year?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}

const FiltersBar: React.FC<Props> = ({ month, year, onMonthChange, onYearChange }) => {
  const monthValue = month || MONTH;
  const yearValue = year || YEAR;

  const handleMonthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onMonthChange && onMonthChange(+e.target.value);
  }, [onMonthChange]);

  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onYearChange && onYearChange(+e.target.value);
  }, [onYearChange]);

  return (
    <div className="filters-bar">
      <div className="section">
        <div className="label">Month:</div>
        <input
          className="month"
          type="number"
          min={1}
          max={12}
          value={monthValue}
          onChange={handleMonthChange}
        />
      </div>
      <div className="section">
        <div className="label">Year:</div>
        <input
          className="year"
          type="number"
          min={1000}
          max={9999}
          value={yearValue}
          onChange={handleYearChange}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
