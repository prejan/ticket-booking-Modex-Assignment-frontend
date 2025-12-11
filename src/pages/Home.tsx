import React from 'react';
import { Link } from 'react-router-dom';
import { useShows } from '../context/ShowContext';

const Home: React.FC = () => {
  const { shows } = useShows();

  return (
    <div>
      <h2>Available Shows / Trips</h2>
      {shows.length === 0 ? (
        <p>No shows yet. Admin can create shows at /admin</p>
      ) : (
        <ul>
          {shows.map(s => (
            <li key={s.id}>
              <strong>{s.name}</strong> - {new Date(s.start_time).toLocaleString()} - Seats: {s.total_seats}
              {' - '}
              <Link to={`/booking/${s.id}`}>Book</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
