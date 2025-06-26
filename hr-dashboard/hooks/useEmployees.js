import useSWR from 'swr';
import { useMemo } from 'react';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function useEmployees() {
  const { data, error } = useSWR('https://dummyjson.com/users?limit=20', fetcher);
  const departments = ['Sales', 'HR', 'Tech', 'Design'];

  const employees = useMemo(() => {
    if (!data?.users) return [];

    return data.users.map(user => ({
      ...user,
      department: departments[user.id % departments.length],
      rating: (user.id % 5) + 1 
    }));
  }, [data]);

  return { employees, loading: !data && !error, error };
}
