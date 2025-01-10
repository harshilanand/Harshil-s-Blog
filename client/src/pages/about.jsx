import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const testBackendAndDB = async () => {
          try {
            const res = await fetch('/api/db-test');
            const data = await res.json();
            console.log('Backend to DB Response:', data);
          } catch (err) {
            console.error('Error connecting backend to DB:', err);
          }
        };
        testBackendAndDB();
  }, []);

  return (
    <div>
      <h1>About hi</h1>
    </div>
  );
}
