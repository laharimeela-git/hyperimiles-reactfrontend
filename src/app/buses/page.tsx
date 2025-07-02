'use client';

import React, { useEffect, useState } from 'react';
import styles from './BusSearch.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

const BusSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState<string>('');

  // Populate values from query string
  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    if (from) setFromCity(from);
    if (to) setToCity(to);
    if (date) setDepartureDate(date);
  }, [searchParams]);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (fromCity) params.set('from', fromCity);
    if (toCity) params.set('to', toCity);
    if (departureDate) params.set('date', departureDate);
    return params.toString();
  };

  const onSearchBus = () => {
    const queryString = buildQueryParams();
    router.push(`/buses?${queryString}`);
  };

  return (
    <div className={styles.busSearchContainer}>
      <form className={styles.busSearchBar} autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.busField}>
          <label>From</label>
          <input
            type="text"
            placeholder="Departure City"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
        </div>
        <div className={styles.busField}>
          <label>To</label>
          <input
            type="text"
            placeholder="Destination City"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
          />
        </div>
        <div className={styles.busField}>
          <label>Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.busSearchBtn}
          onClick={onSearchBus}
          disabled={!fromCity || !toCity}
        >
          Search Buses
        </button>
      </form>
    </div>
  );
};

export default BusSearch;
