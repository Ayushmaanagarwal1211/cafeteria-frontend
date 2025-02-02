import React, { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useGet';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';
import { BarChart, LineChart } from '@mui/x-charts';
import { useTheme } from '@mui/material';
const chartSettings = {
  sx: {
    '& .MuiChartsAxis-label': {
      fontSize: '0.9rem',
      fontWeight: '500',
      fill: 'white', // Axis labels white
    },
    '& .MuiChartsAxis-tick': {
      fill: 'white', // Tick labels white
    },
    '& .MuiChartsAxis-line': {
      stroke: 'white', // Axis lines white
    },
    '& .MuiChartsAxis-tickLine': {
      stroke: 'white', // Tick lines white
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: 'white', // Legend text white
    },
    '& .MuiChartsLegend-series': {
      fill: 'white', // Legend text white
    },
    
    '& .MuiChartsGrid-line': {
      stroke: 'rgba(255, 255, 255, 0.1)', // Grid lines semi-transparent white
    }
  },
  height: 350,
  margin: { top: 70, right: 20, bottom: 40, left: 50 },
};

export default function Summary() {
  const theme = useTheme()
  const user = useSelector((state) => selectUser(state));
  const [data, setData] = useState([]);

  function fetchData() {
    const map = new Map();
    useGet(user.role === 'customer' ? `order/get-orders-by-user/${user._id}` : `order/get-all-orders`).then((res) => {
      for (let i of res.data) {
        if (!i.dish) {
          continue;
        }
        const price = i.quantity * i.dish.price;
        const date = new Date(i.date).toLocaleDateString();
        if (!map.has(date)) {
          map.set(date, { quantity: 0, price: 0 });
        }
        map.set(date, {
          quantity: map.get(date).quantity + i.quantity,
          price: map.get(date).price + ((+i.quantity) * (+i.dish.price)),
        });
      }

      let arr = [];
      const dates_arr = [];
      Array.from(map.entries()).map(([date, { quantity, price }]) => {
        arr.push({ quantity, price, date });
      });
      arr = arr.sort((a, b) => a.date.localeCompare(b.date));
      setData(arr);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-8 dark:bg-gray-900 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold  dark:text-white mb-6">Summary</h1>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart Card */}
          <div className=" bg-gray-800 shadow-md rounded-xl p-6 h-auto w-full transition-all hover:shadow-lg">
            <BarChart
              dataset={data}
              
              xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
              series={[{ dataKey: 'quantity', label: 'Quantities Sold', color: 'green' }]}
              {...chartSettings}
              tooltip
              height={300}
              className="transition-all"
            />
          </div>

          {/* Line Chart Card */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 h-auto w-full transition-all hover:shadow-lg">
            <LineChart
              xAxis={[{ scaleType: 'band', data: data.map((d) => d.date), label: 'Date' }]}
              series={[{ data: data.map((d) => d.price), label: 'Total Revenue', area: true, color: '#2196F3' }]}
              tooltip
              height={300}
              className="transition-all"
              {...chartSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



