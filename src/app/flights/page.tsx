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
        <input
          type="text"
          placeholder="From"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />
        <button onClick={swapCities}>⇄</button>
        <input
          type="text"
          placeholder="To"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        {selectedTripType === 'Return' && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        )}
        <div className={styles.travellersField}>
          <span onClick={() => setShowTravellersDropdown(!showTravellersDropdown)}>
            {getTravellersText()}
          </span>
          {showTravellersDropdown && (
            <div className={styles.dropdown}>
              <div>
                Adults:
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                {adults}
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
              <div>
                Children:
                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                {children}
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
              <div>
                Infants:
                <button onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
                {infants}
                <button onClick={() => setInfants(infants + 1)}>+</button>
              </div>
              <div>
                Cabin Class:
                <select value={selectedCabinClass} onChange={(e) => setSelectedCabinClass(e.target.value)}>
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <button onClick={onSearchFlight}>Search Flights</button>
      </div>
    </div>
  );
};

export default FlightSearch;
