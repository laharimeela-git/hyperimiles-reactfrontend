'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './FlightSearch.module.scss';

const FlightSearch: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [selectedTripType, setSelectedTripType] = useState('Return');

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedCabinClass, setSelectedCabinClass] = useState('Economy');
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const [showTravellersDropdown, setShowTravellersDropdown] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Populate values from URL
  useEffect(() => {
    setFromCity(searchParams.get('from') || '');
    setToCity(searchParams.get('to') || '');
    setDepartureDate(searchParams.get('departure') || '');
    setReturnDate(searchParams.get('return') || '');
    setAdults(Number(searchParams.get('adults')) || 1);
    setChildren(Number(searchParams.get('children')) || 0);
    setInfants(Number(searchParams.get('infants')) || 0);
    setSelectedCabinClass(searchParams.get('cabinClass') || 'Economy');
    setSelectedTripType(searchParams.get('tripType') || 'Return');
  }, [searchParams]);

  const swapCities = () => {
    setIsSwapping(true);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const buildQueryParams = () => {
    const params: Record<string, string> = {
      from: fromCity,
      to: toCity,
      departure: departureDate,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      cabinClass: selectedCabinClass,
      tripType: selectedTripType,
    };

    if (selectedTripType === 'Return' && returnDate) {
      params.return = returnDate;
    }

    return new URLSearchParams(params).toString();
  };

  const onSearchFlight = () => {
    const queryString = buildQueryParams();
    router.push(`/flights?${queryString}`);
  };

  const getTravellersText = () => {
    const adultText = adults === 1 ? 'Adult' : 'Adults';
    return `${adults} ${adultText}, ${selectedCabinClass}`;
  };

  return (
    <div className={styles.flightSearchContainer}>
      <div className={styles.tripTypeSection}>
        <button onClick={() => setShowTripDropdown(!showTripDropdown)}>
          ✈ {selectedTripType} ▼
        </button>
        {showTripDropdown && (
          <div className={styles.dropdown}>
            {['Return', 'One Way', 'Multi City'].map(type => (
              <div key={type} onClick={() => {
                setSelectedTripType(type);
                setShowTripDropdown(false);
                if (type !== 'Return') setReturnDate('');
              }}>
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

<div className={styles.searchForm}>
  <div className={styles.formFields}>
    <div className={`${styles.fieldGroup} ${styles.fromField}`}>
      <label>From</label>
      <input
        type="text"
        placeholder="Departure"
        value={fromCity}
        onChange={(e) => setFromCity(e.target.value)}
      />
    </div>

    <button className={styles.swapButton} onClick={swapCities}>
      ⇄
    </button>

    <div className={`${styles.fieldGroup} ${styles.toField}`}>
      <label>To</label>
      <input
        type="text"
        placeholder="Arrival"
        value={toCity}
        onChange={(e) => setToCity(e.target.value)}
      />
    </div>

    <div className={`${styles.fieldGroup} ${styles.dateField}`}>
      <label>Depart</label>
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
      />
    </div>

    {selectedTripType === 'Return' && (
      <div className={`${styles.fieldGroup} ${styles.dateField}`}>
        <label>Return</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
    )}

    <div className={`${styles.fieldGroup} ${styles.travellersField}`}>
      <label>Travellers and cabin class</label>
      <div className={styles.travellersDropdownField}>
        <span
          className={styles.travellersDisplay}
          onClick={() => setShowTravellersDropdown(!showTravellersDropdown)}
        >
          {getTravellersText()}
        </span>
        {showTravellersDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.passengerRow}>
              <span>Adults:</span>
              <div className={styles.counterControls}>
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                <span className={styles.count}>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>
            <div className={styles.passengerRow}>
              <span>Children:</span>
              <div className={styles.counterControls}>
                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                <span className={styles.count}>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>
            <div className={styles.passengerRow}>
              <span>Infants:</span>
              <div className={styles.counterControls}>
                <button onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
                <span className={styles.count}>{infants}</span>
                <button onClick={() => setInfants(infants + 1)}>+</button>
              </div>
            </div>
            <div className={styles.cabinClassRow}>
              <label>Cabin Class:</label>
              <select 
                value={selectedCabinClass} 
                onChange={(e) => setSelectedCabinClass(e.target.value)}
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  <button className={styles.searchButton} onClick={onSearchFlight}>
    Search Flights
  </button>
</div>
    </div>
  );
};

export default FlightSearch;
