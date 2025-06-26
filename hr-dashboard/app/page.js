'use client';
import { useState, useMemo } from 'react';
import useEmployees from '../hooks/useEmployees';
import { useStore } from '../store/useStore';
import Link from 'next/link';

export default function HomePage() {
  const { employees, loading } = useEmployees();
  const bookmarks = useStore(state => state.bookmarks);
  const toggle = useStore(state => state.toggleBookmark);

  const [search, setSearch] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Extract available departments and ratings from data
  const departments = [...new Set(employees.map(e => e.department))];
  const ratings = [1, 2, 3, 4, 5];

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch =
        emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase());

      const matchDept =
        selectedDepartments.length === 0 || selectedDepartments.includes(emp.department);

      const matchRating =
        selectedRatings.length === 0 || selectedRatings.includes(emp.rating);

      return matchSearch && matchDept && matchRating;
    });
  }, [employees, search, selectedDepartments, selectedRatings]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <div className="flex flex-wrap gap-4 w-30px">
          <select
            multiple
            value={selectedDepartments}
            onChange={e =>
              setSelectedDepartments(
                Array.from(e.target.selectedOptions, option => option.value)
              )
            }
            className="border p-3  rounded w"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            multiple
            value={selectedRatings}
            onChange={e =>
              setSelectedRatings(
                Array.from(e.target.selectedOptions, option => Number(option.value))
              )
            }
            className="border p-3 rounded "
          >
            {ratings.map(rate => (
              <option key={rate} value={rate}>
                ⭐ {rate}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredEmployees.map(emp => (
          <div
            key={emp.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={emp.picture}
                alt={emp.fullName}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{emp.fullName}</h2>
                <p className="text-sm text-gray-500">{emp.email}</p>
                <p className="text-sm">Department: {emp.department}</p>
                <p className="text-sm">Age: {emp.age}</p>
                <p className="text-yellow-500">⭐ {emp.rating} / 5</p>
                <div className="flex flex-wrap gap-2 mt-2">
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
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Promote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
