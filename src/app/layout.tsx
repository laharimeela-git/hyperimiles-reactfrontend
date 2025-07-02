// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import React from 'react';

export const metadata = {
  title: 'Hypermile',
  description: 'Hypermile - Your Travel Companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
