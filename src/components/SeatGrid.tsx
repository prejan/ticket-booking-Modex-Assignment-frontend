import React from 'react';

type Seat = { seat_number: number; is_booked: boolean };

type Props = {
  seats: Seat[];
  selected: number[];
  toggle: (n: number) => void;
};

const SeatGrid: React.FC<Props> = ({ seats, selected, toggle }) => {
  return (
    <div className="seat-grid">
      {seats.map((s) => {
        const num = s.seat_number;
        const isSelected = selected.includes(num);
        return (
          <button
            key={num}
            className={`seat ${s.is_booked ? 'booked' : isSelected ? 'selected' : ''}`}
            disabled={s.is_booked}
            onClick={() => toggle(num)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default SeatGrid;
