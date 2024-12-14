// src/components/ExploreMore.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ExploreMore = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Explore More</h1>
      <div className="space-y-4">
        <Link to="/auth/student-login" className="block p-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Login/Register as Student
        </Link>
        <Link to="/auth/admin-login" className="block p-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Login/Register as Admin
        </Link>
      </div>
    </div>
  );
};

export default ExploreMore;
