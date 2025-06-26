'use client';
import useEmployees from '../hooks/useEmployees';
import { useStore } from '../store/useStore';
import Link from 'next/link';

export default function HomePage() {
  const { employees, loading } = useEmployees();
  const bookmarks = useStore(state => state.bookmarks);
  const toggle = useStore(state => state.toggleBookmark);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
      {employees.map(emp => (
        <div key={emp.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <img src={emp.picture} alt={emp.fullName} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">{emp.fullName}</h2>
              <p className="text-sm text-gray-500">{emp.email}</p>
              <p className="text-sm">Department: {emp.department}</p>
              <p className="text-sm">Age: {emp.age}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-yellow-500 text-sm">⭐ {emp.rating} / 5</p>
            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Promote</button>
          </div>

          <div className="flex gap-2 mt-auto">
            <Link href={`/employee/${emp.id}`}>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full">View</button>
            </Link>
            <button
              onClick={() => toggle(emp.id)}
              className={`${
                bookmarks.includes(emp.id) ? 'bg-red-500' : 'bg-green-500'
              } text-white px-3 py-1 rounded text-sm w-full`}
            >
              {bookmarks.includes(emp.id) ? 'Unbookmark' : 'Bookmark'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
