import React from 'react';
import { StockData } from '../types';

interface Props {
  stockData: StockData[];
}

const StockTable: React.FC<Props> = ({ stockData }) => {
  return (
    <div>
      <h2>Stock Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
              <td>{new Date(stock.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
