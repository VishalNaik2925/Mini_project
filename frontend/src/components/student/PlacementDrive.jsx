import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming the Sidebar component is in the student folder

function StudentPlacementDrive() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/placements');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">Latest news and other event photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition"
              key={photo._id}
              onClick={() => openModal(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.description}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-600">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-4/5 md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.description}
              className="w-full h-auto rounded-md mb-4"
            />
            <p className="text-lg text-gray-700">{selectedPhoto.description}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentPlacementDrive;
