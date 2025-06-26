'use client';
import { useState } from 'react';

export default function CreateUserModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', department: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.department) {
      alert('All fields are required!');
      return;
    }
    console.log('New user:', form);
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            className="w-full px-3 py-2 border rounded"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="department"
            className="w-full px-3 py-2 border rounded"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
