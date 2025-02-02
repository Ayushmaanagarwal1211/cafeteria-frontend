import React, { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useGet';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';
import { BarChart, LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSettings = {
  sx: {
    '& .MuiChartsAxis-label': {
      fontSize: '0.9rem',
      fontWeight: '500',
    },
  },
  height: 300,
  margin: { top: 70, right: 20, bottom: 40, left: 50 },
};

export default function Summary() {
  const user = useSelector((state) => selectUser(state));
  const [data , setData] = useState([])
  function fetchData() {
    const map = new Map();
    useGet(user.role === 'customer' ? `order/get-orders-by-user/${user._id}` : `order/get-all-orders`).then((res) => {
      for (let i of res.data) {
        const price = i.quantity * i.dish.price;
        const date = new Date(i.date).toLocaleDateString()
        if (!map.has(date)) {
          map.set(date, { quantity: 0, price: 0 });
        }
        map.set(date, {
          quantity: map.get(date).quantity + i.quantity,
          price: map.get(date).price + ((+i.quantity) * (+i.dish.price)),
        });
      }

      let arr = []
      const dates_arr = [] 
      Array.from(map.entries()).map(([date, { quantity, price }]) => {
        arr.push({quantity,price,date})

      });
      arr = arr.sort((a,b)=>a.date.localeCompare(b.date))
      setData(arr)

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
          <div className="bg-white shadow-md rounded-xl p-6 h-auto w-auto">
            <BarChart
              dataset={data}
              xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
              series={[{ dataKey: 'quantity', label: 'Quantities Sold', color: 'green' }]}
              {...chartSettings}
            />
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 h-auto w-auto">
            <LineChart
  xAxis={[
    {
      scaleType: 'band',
      data: data.map((d) => d.date),
      label: 'Date',
    },
  ]}
  series={[
    {
      data: data.map((d) => d.price), 
      label: 'Total Revenue',
      area: true,
      color: '#2196F3', 
    },
  ]}
  tooltip
  height={300}
/>
          </div>
        </div>
      </div>
    </div>
  );
}
