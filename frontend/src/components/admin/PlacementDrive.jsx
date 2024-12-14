import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPlacementDrive = () => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State for full-screen modal

  // Fetch existing photos from the backend
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/placements");
        setPhotos(response.data); // Set the photos data
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo || !description) {
      alert("Please upload a photo and provide a description.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/placement-drive",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Photo uploaded successfully!");
      setPhoto(null);
      setDescription("");
      setPhotos([...photos, response.data]); // Add new photo to the state
    } catch (error) {
      console.error("Error uploading photo", error);
      alert("Error uploading photo!");
    }
  };

  // Handle delete photo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/placement-drive/${id}`);
      alert("Photo deleted successfully!");
      // Remove the deleted photo from the state
      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo!");
    }
  };
  

  // Open the full-screen modal with selected photo
  const handleOpenFullScreen = (photo) => {
    setSelectedPhoto(photo);
  };

  // Close the full-screen modal
  const handleCloseFullScreen = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Existing Photos Block */}
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Placement Drive Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div
                  key={photo._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200 flex flex-col items-center"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.description}
                    className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                    onClick={() => handleOpenFullScreen(photo)} // Open full-screen on click
                  />
                  <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No photos available</p>
            )}
          </div>
        </div>

        {/* Right: Upload Photo Form */}
        <div
          className="lg:w-1/4 bg-white p-6 rounded-lg shadow-lg"
          style={{
            maxHeight: '430px', // Set maximum height for the form container
            overflowY: 'auto', // Enable vertical scrolling if content overflows
          }}
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Upload Photo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Photo:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Description:</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a description for the placement drive"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Photo
            </button>
          </form>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleCloseFullScreen}
        >
          <div className="relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={handleCloseFullScreen}
            >
              &times; {/* This will display the "X" */}
            </button>

            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.description}
              className="max-w-4xl max-h-full object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking image
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlacementDrive;
