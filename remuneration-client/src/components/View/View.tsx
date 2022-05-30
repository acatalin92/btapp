import React from 'react';
import './View.css';
import Loader from '../Loader';
import noResultsIcon from '../../assets/no_results.png';

interface Props {
  isLoading?: boolean;
  isEmpty?: boolean;
}

const View: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & Props>
> = ({ isLoading, isEmpty, className, children }) => {
  const classes =
    'view' +
    (isEmpty ? ' empty' : '') +
    (className ? ` ${className}` : '');

  return (
    <div className={classes}>
      {isLoading ? (
        <div className="overlay">
          <div className="loading">
            <Loader />
          </div>
        </div>
      ) : (
        <React.Fragment>
          {children}
          {isEmpty && (
            <div className="overlay">
              <div className="no-results">
                <img src={noResultsIcon} className="image" alt="no-results" /> 
                <span className="text">There is nothing to show</span>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default View;
