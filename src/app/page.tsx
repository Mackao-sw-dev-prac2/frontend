'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { eventsApi } from '@/lib/api/events';
import { Event } from '@/lib/types/event';
import { EventCard } from '@/components/events/EventCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar, Ticket } from 'lucide-react';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        if (response.success && response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to EventTicketer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop solution for event management and ticketing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Calendar className="text-primary-600 mb-4" size={48} />
            <h2 className="text-2xl font-semibold mb-2">Event Management</h2>
            <p className="text-gray-600">
              Create, manage, and organize events with ease. Full control over
              event details, dates, and ticket availability.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Ticket className="text-primary-600 mb-4" size={48} />
            <h2 className="text-2xl font-semibold mb-2">Ticketing System</h2>
            <p className="text-gray-600">
              Efficient ticket reservation management. View and manage all
              ticketing requests in one place.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Available Events
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : events.length === 0 ? (
            <EmptyState message="No events available at the moment" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event._id} href={`/events/${event._id}`}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

