import React, { useState, useEffect } from "react";
import axios from "axios";

const AlumniInteractionPageForStudents = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [videos, setVideos] = useState([]);

    // Fetch alumni and video data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const alumniResponse = await axios.get("http://localhost:5000/api/alumni");
                const videoResponse = await axios.get("http://localhost:5000/api/videos");
                setAlumniList(alumniResponse.data);
                setVideos(videoResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="alumni-interaction bg-white p-8">

            <h1 className="text-3xl font-bold text-center mb-8 text-teal-600">Alumni Interaction</h1>

            {/* Alumni Details Block with a light background */}
            <div className="alumni-block mb-8 bg-blue-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-teal-700">Alumni Details</h2>
                <div className="alumni-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumniList.map((alumni, index) => (
                        <div key={index} className="alumni-card p-6 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4 transform hover:scale-105 transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold text-teal-700">{alumni.name}</h3>
                            <p className="text-sm text-gray-600">Batch: {alumni.batch}</p>
                            <p className="text-sm text-gray-600">Company: {alumni.company}</p>
                            <div className="flex space-x-4">
                                <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    LinkedIn
                                </a>
                                <a href={alumni.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Block with light background */}
            <div className="video-block bg-green-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-teal-700">Alumni Interview Videos</h2>
                <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card p-4 bg-white rounded-lg shadow-lg mb-4 w-full max-w-sm mx-auto">
                            <h3 className="text-xl font-semibold text-teal-700">{video.title}</h3>
                            <p className="text-sm text-gray-600">{video.description}</p>
                            <div className="video-container mt-4">
                                <video
                                    controls
                                    className="w-full max-w-xs h-56 object-cover rounded-lg"
                                >
                                    <source src={`http://localhost:5000${video.url}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlumniInteractionPageForStudents;
