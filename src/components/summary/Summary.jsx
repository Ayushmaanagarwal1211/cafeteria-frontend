import React, { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useGet';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Value',
    },
  ],
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
    [`.${axisClasses.bottom} .${axisClasses.label}`]: {
      transform: 'translate(-5px, 10px)', // Rotate x-axis labels
      textAnchor: 'end', // Align the text at the end
    },
  },
};

export default function Summary() {
  const user = useSelector((state) => selectUser(state));
  const [dates, setDates] = useState([]);

  function fetchData() {
    const map = new Map();
    useGet(user.role === 'customer' ? `order/get-orders-by-user/${user._id}` : `order/get-orders`).then((res) => {
      for (let i of res.data) {
        const price = i.quantity * i.dish.price;
        const date = new Date(i.date).toLocaleDateString()
        if (!map.has(date)) {
          map.set(date, { quantity: 0, price: 0 });
        }
        map.set(date, {
          quantity: map.get(date).quantity + i.quantity,
          price: map.get(date).price + price,
        });
      }

      const arr = Array.from(map.entries()).map(([date, { quantity, price }]) => ({
        date,
        quantity,
        price,
      }));
      setDates(arr);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Summary</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Chart */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Price Summary</h2>
            <BarChart
              dataset={dates}
              xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
              series={[{ dataKey: 'price', label: 'Price', color: 'green' }]}
              {...chartSetting}
            />
          </div>

          {/* Orders Chart */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Orders Summary</h2>
            <BarChart
              dataset={dates}
              xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
              series={[{ dataKey: 'quantity', label: 'Orders', color: 'blue' }]}
              {...chartSetting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
