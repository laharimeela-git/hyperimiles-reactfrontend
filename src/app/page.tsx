'use client';

import React, { useState } from 'react';
import FlightSearch from '@/app/flights/page';
import HotelSearch from '@/app/hotels/page';
import BusSearch from '@/app/buses/page';
import Navbar from '@/components/Navbar';

type Tab = 'flights' | 'hotels' | 'buses';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('hotels');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'flights':
        return <FlightSearch title={''} />;
      case 'buses':
        return <BusSearch />;
      case 'hotels':
      default:
        return <HotelSearch />;
    }
  };

  return (
    <div>
      <Navbar />
      
      <div>{renderTabContent()}</div>
    </div>
  );
}
