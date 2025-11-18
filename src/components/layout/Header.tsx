'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Ticket } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="text-primary-600" size={32} />
            <span className="text-2xl font-bold text-gray-900">
              EventTicketer
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
