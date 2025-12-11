import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJSON } from '../api/client';
import SeatGrid from '../components/SeatGrid';

type Seat = { seat_number: number; is_booked: boolean };

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<any>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await fetchJSON(`/shows/${id}`);
    setShow(data);
    setSeats(data.seats);
  };

  useEffect(() => {
    load().catch(console.error);
    // eslint-disable-next-line
  }, [id]);

  const toggle = (n: number) => {
    setSelected(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]));
  };

  const submit = async () => {
    if (selected.length === 0) { alert('Select seats'); return; }
    setLoading(true);
    try {
      const booking = await fetchJSON('/bookings', { method: 'POST', body: { show_id: Number(id), seats: selected } });
      alert(`Booking confirmed: ${booking.id}`);
      // refresh seats
      await load();
      setSelected([]);
    } catch (err: any) {
      alert(err.message || 'Booking failed');
      await load();
    } finally {
      setLoading(false);
    }
  };

  if (!show) return <div>Loading show...</div>;

  return (
    <div>
      <h2>Booking - {show.name}</h2>
      <p>Start: {new Date(show.start_time).toLocaleString()}</p>
      <SeatGrid seats={seats} selected={selected} toggle={toggle} />
      <div style={{ marginTop: 12 }}>
        <button onClick={submit} disabled={loading}>Confirm Booking ({selected.length})</button>
      </div>
    </div>
  );
};

export default Booking;
