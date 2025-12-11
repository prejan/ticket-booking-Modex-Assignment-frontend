import React, { useState } from 'react';
import { fetchJSON } from '../api/client';
import { useShows } from '../context/ShowContext';

const Admin: React.FC = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [totalSeats, setTotalSeats] = useState<number>(40);
  const { reload } = useShows();
  const [loading, setLoading] = useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchJSON('/shows', { method: 'POST', body: { name, start_time: startTime, total_seats: totalSeats } });
      setName(''); setStartTime(''); setTotalSeats(40);
      await reload();
      alert('Show created');
    } catch (err: any) {
      alert(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Admin - Create Show</h2>
      <form onSubmit={create}>
        <div>
          <label>Show Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Start Time (ISO)</label><br />
          <input value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="2025-12-12T10:00:00Z" required />
        </div>
        <div>
          <label>Total Seats</label><br />
          <input type="number" value={totalSeats} onChange={e => setTotalSeats(Number(e.target.value))} min={1} required />
        </div>
        <button type="submit" disabled={loading}>Create</button>
      </form>
    </div>
  );
};

export default Admin;
