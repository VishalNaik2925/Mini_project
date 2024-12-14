import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    createdBy: '', // Admin's name or ID
  });

  const [events, setEvents] = useState([]); // State to store the events list
  const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events
  const [filter, setFilter] = useState('all'); // Filter state

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data.events); // Store the events in state
      setFilteredEvents(response.data.events); // Initially show all events
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  // Handle input changes for creating an event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle event creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/events/create', formData);
      alert(response.data.message); // Show success message from server
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        createdBy: '',
      });
      fetchEvents(); // Refresh the event list after creation
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to create event. Please try again.');
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);

    const now = new Date();
    let filtered = events;

    if (filterType === 'past') {
      filtered = events.filter((event) => new Date(event.date) < now);
    } else if (filterType === 'current') {
      filtered = events.filter(
        (event) => new Date(event.date).toDateString() === now.toDateString() // Match today's date
      );
    } else if (filterType === 'upcoming') {
      filtered = events.filter((event) => new Date(event.date) > now);
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Event Details Block */}
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Upcoming Events</h2>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => handleFilterChange('past')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => handleFilterChange('current')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Current Events
            </button>
            <button
              onClick={() => handleFilterChange('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Upcoming Events
            </button>
          </div>

          {/* Events Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-blue-200"
                >
                  <h3 className="text-2xl font-bold text-blue-700 mb-3">{event.title}</h3>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Created By:</strong> {event.createdBy}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No events available</p>
            )}
          </div>
        </div>

        {/* Right: Create Event Form */}
        <div
          className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg"
          style={{
            maxHeight: '650px', // Set maximum height
            overflowY: 'auto', // Enable scroll if content overflows
          }}
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Create Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
