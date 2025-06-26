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
        <div key={emp.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="flex items-center gap-4">
            <img src={emp.picture} alt={emp.fullName} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">{emp.fullName}</h2>
              <p className="text-sm text-gray-500">{emp.email}</p>
              <p className="text-sm">Department: {emp.department}</p>
              <p className="text-sm">Age: {emp.age}</p>
              <p className="text-yellow-500">⭐ {emp.rating} / 5</p>
              <div className="flex gap-2 mt-2">
                <Link href={`/employee/${emp.id}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                </Link>
                <button
                  onClick={() => toggle(emp.id)}
                  className={`${
                    bookmarks.includes(emp.id) ? 'bg-red-500' : 'bg-green-500'
                  } text-white px-2 py-1 rounded`}
                >
                  {bookmarks.includes(emp.id) ? 'Unbookmark' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
