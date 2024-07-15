import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setStockData } from '../store/stockDataSlice';
import axios from 'axios';
import StockTable from '../components/StockTable';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stockData = useSelector((state: RootState) => state.stockData.data);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Polling every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/stocks'); // Replace with actual API endpoint
      dispatch(setStockData(response.data));
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <h1>Real-Time Stock Data</h1>
      <StockTable stockData={stockData} />
    </div>
  );
};

export default Home;
