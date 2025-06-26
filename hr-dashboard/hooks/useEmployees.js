import useSWR from 'swr';
import { useMemo } from 'react';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function useEmployees() {
  const { data, error } = useSWR('https://randomuser.me/api/?results=20&nat=us', fetcher);
  const departments = ['Sales', 'HR', 'Tech', 'Design'];

  const employees = useMemo(() => {
    if (!data?.results) return [];

    return data.results.map((user, index) => ({
      id: index + 1,
      fullName: `${user.name.first} ${user.name.last}`,
      email: user.email,
      age: user.dob.age,
      phone: user.phone,
      address: `${user.location.city}, ${user.location.state}`,
      picture: user.picture.medium,
      department: departments[index % departments.length],
      rating: (index % 5) + 1,
      bio: `Experienced member of the ${departments[index % departments.length]} team.`,
      performanceHistory: Array.from({ length: 4 }, (_, i) => ({
        year: 2020 + i,
        rating: Math.floor(Math.random() * 5) + 1
      }))
    }));
  }, [data]);

  return {
    employees,
    loading: !data && !error,
    error
  };
}
