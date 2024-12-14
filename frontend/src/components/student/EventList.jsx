import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('upcoming'); // Default filter to 'upcoming'

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events'); // Ensure this route is correct in your backend
      setEvents(response.data.events); // Assuming your response has a 'events' property
      setFilteredEvents(response.data.events); // Initially show all events
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again.');
    }
  };

  // Apply filter based on event status (upcoming, past, current)
  const filterEvents = (filterType) => {
    setFilter(filterType);

    const currentDate = new Date();
    let filtered = [];

    if (filterType === 'upcoming') {
      filtered = events.filter((event) => new Date(event.date) > currentDate);
    } else if (filterType === 'past') {
      filtered = events.filter((event) => new Date(event.date) < currentDate);
    } else if (filterType === 'current') {
      filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toLocaleDateString() === currentDate.toLocaleDateString();
      });
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-blue-400 p-8">
      <h1 className="text-4xl font-semibold text-center text-white mb-6">Upcoming Events</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => filterEvents('upcoming')}
          className={`px-6 py-2 rounded-md text-white font-semibold ${filter === 'upcoming' ? 'bg-green-500' : 'bg-green-300'} hover:bg-green-600 transition duration-200`}
        >
          Upcoming
        </button>
        <button
          onClick={() => filterEvents('past')}
          className={`px-6 py-2 rounded-md text-white font-semibold ${filter === 'past' ? 'bg-red-500' : 'bg-red-300'} hover:bg-red-600 transition duration-200`}
        >
          Past
        </button>
        <button
          onClick={() => filterEvents('current')}
          className={`px-6 py-2 rounded-md text-white font-semibold ${filter === 'current' ? 'bg-blue-500' : 'bg-blue-300'} hover:bg-blue-600 transition duration-200`}
        >
          Current
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-4">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-500">
                <strong>Created By:</strong> {event.createdBy}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
