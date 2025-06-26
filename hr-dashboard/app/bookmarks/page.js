'use client';

import { useStore } from '../../store/useStore';
import useEmployees from '../../hooks/useEmployees';
import Link from 'next/link';

export default function BookmarksPage() {
  const { employees, loading } = useEmployees();
  const bookmarks = useStore(state => state.bookmarks);
  const toggle = useStore(state => state.toggleBookmark);

  const bookmarkedUsers = employees.filter(emp => bookmarks.includes(emp.id));

  if (loading) return <p className="p-4">Loading bookmarks...</p>;
  if (bookmarkedUsers.length === 0) return <p className="p-4">No bookmarks yet.</p>;

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarkedUsers.map(user => (
        <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm">Department: {user.department}</p>
          <p className="text-yellow-400">⭐ {user.rating}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Link href={`/employee/${user.id}`}>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
            </Link>
            <button
              onClick={() => toggle(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove Bookmark
            </button>
            <button className="bg-green-600 text-white px-3 py-1 rounded">Promote</button>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded">Assign to Project</button>
          </div>
        </div>
      ))}
    </div>
  );
}
