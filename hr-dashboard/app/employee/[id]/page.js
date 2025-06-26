'use client';

import { useParams } from 'next/navigation';
import useEmployees from '../../../hooks/useEmployees';
import { useState } from 'react';

export default function EmployeePage() {
  const { id } = useParams();
  const { employees, loading } = useEmployees();
  const [tab, setTab] = useState('Overview');

  const user = employees.find(emp => emp.id.toString() === id);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4">User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-sm mt-1">📞 {user.phone} | 🏠 {user.address.address}</p>
      <p className="text-sm">Department: {user.department} | Age: {user.age}</p>
      <p className="text-yellow-400 mt-1">⭐ {user.rating} / 5</p>

      <div className="mt-6">
        <div className="flex gap-3 mb-4">
          {['Overview', 'Projects', 'Feedback'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded ${
                tab === t ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-4 border rounded bg-white dark:bg-gray-800">
          {tab === 'Overview' && (
            <div>
              <p className="text-sm">Bio: Enthusiastic team player. Loves collaborating and contributing to HR culture.</p>
              <p className="mt-2 text-sm">Past Ratings:</p>
              <ul className="list-disc pl-5 text-sm text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>Year {2023 - i}: ⭐ {Math.ceil(Math.random() * 5)}</li>
                ))}
              </ul>
            </div>
          )}
          {tab === 'Projects' && (
            <ul className="list-disc pl-5 text-sm">
              <li>Onboarding Process Optimization</li>
              <li>Quarterly Performance Reports</li>
              <li>Team Engagement Workshops</li>
            </ul>
          )}
          {tab === 'Feedback' && (
            <form className="flex flex-col gap-2">
              <textarea
                className="p-2 border rounded bg-gray-100 dark:bg-gray-900"
                placeholder="Write feedback..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded w-fit"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
