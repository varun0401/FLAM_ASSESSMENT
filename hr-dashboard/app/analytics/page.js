'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import useEmployees from '../../hooks/useEmployees';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { employees, loading } = useEmployees();
  const bookmarks = useStore(state => state.bookmarks);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = JSON.parse(localStorage.getItem('bookmark-history')) || [];
      setHistory(local);
    }
  }, []);

  if (loading) return <p className="p-4">Loading analytics...</p>;

  const departments = ['Sales', 'HR', 'Tech', 'Design'];
  const deptRatings = departments.map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    const total = deptEmployees.reduce((sum, e) => sum + e.rating, 0);
    return deptEmployees.length ? (total / deptEmployees.length).toFixed(2) : 0;
  });

const deptColors = ['#60A5FA', '#F472B6', '#34D399', '#FBBF24'];

const avgRatingsData = {
  labels: departments,
  datasets: [
    {
      label: 'Avg Rating',
      data: deptRatings,
      backgroundColor: deptColors,
      borderColor: deptColors.map(c => c.replace('0.6', '1')),
      borderWidth: 1,
    },
  ],
};

  const today = new Date();
const last7Days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - (6 - i));
  return d.toISOString().split('T')[0];
});

const base = bookmarks.length || 3;
const trend = last7Days.map((date, i) => ({
  date,
  count: Math.max(1, base + Math.floor(Math.sin(i) * 2 + Math.random() * 3 - 1)),
}));

const bookmarkTrendData = {
  labels: trend.map(d => d.date),
  datasets: [
    {
      label: 'Bookmarks Over Time',
      data: trend.map(d => d.count),
      borderColor: 'rgba(234, 88, 12, 1)',
      backgroundColor: 'rgba(234, 88, 12, 0.3)',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
};

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">📊 Analytics Dashboard</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Department-wise Average Rating</h2>
        <Bar data={avgRatingsData} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Bookmark Activity (Last 7 Days)</h2>
        <Line data={bookmarkTrendData} />
      </div>
    </div>
  );
}
