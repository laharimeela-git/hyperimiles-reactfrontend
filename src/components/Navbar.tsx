'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import './Navbar.css';
import { MdFlight, MdHotel, MdDirectionsBus } from 'react-icons/md'; // Material Design icons

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="logo">
        <Image src="/assets/hypermileLogo.png" alt="Hypermile Logo" width={120} height={40} />
      </div>
      <div className="nav-links">
        <Link href="/flights" className={pathname === '/flights' ? 'active' : ''}>
          <MdFlight size={20} style={{ marginRight: 6 }} />
          Flight
        </Link>
        <Link href="/hotels" className={pathname === '/hotels' ? 'active' : ''}>
          <MdHotel size={20} style={{ marginRight: 6 }} />
          Hotels
        </Link>
        <Link href="/buses" className={pathname === '/buses' ? 'active' : ''}>
          <MdDirectionsBus size={20} style={{ marginRight: 6 }} />
          Buses
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
