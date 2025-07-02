'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import './Navbar.css';
// import hypermileLogo from '../../public/hypermilelogo.png'; // Make sure it's inside /public

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="logo">
        {/* <Image src={hypermileLogo} alt="Hypermile Logo" width={120} height={40} /> */}
      </div>
      <div className="nav-links">
        <Link href="/flights" className={pathname === '/flights' ? 'active' : ''}>Flight</Link>
        <Link href="/hotels" className={pathname === '/hotels' ? 'active' : ''}>Hotels</Link>
        <Link href="/buses" className={pathname === '/buses' ? 'active' : ''}>Buses</Link>
      </div>
    </nav>
  );
};

export default Navbar;
