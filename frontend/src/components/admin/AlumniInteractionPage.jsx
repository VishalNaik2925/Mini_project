import React, { useState, useEffect } from "react";
import axios from "axios";

const AlumniInteractionPage = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [videos, setVideos] = useState([]);
    const [newAlumni, setNewAlumni] = useState({
        name: "",
        linkedin: "",
        github: "",
        batch: "",
        company: "",
    });
    const [newVideo, setNewVideo] = useState({ title: "", description: "", file: null });

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

    // Add a new alumni
    const handleAddAlumni = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/alumni", newAlumni);
            setAlumniList((prev) => [...prev, response.data]);
            setNewAlumni({ name: "", linkedin: "", github: "", batch: "", company: "" });
        } catch (error) {
            console.error("Error adding alumni:", error);
        }
    };

    // Upload a new video
    const handleUploadVideo = async () => {
        const formData = new FormData();
        formData.append("title", newVideo.title);
        formData.append("description", newVideo.description);
        formData.append("file", newVideo.file);

        try {
            const response = await axios.post("http://localhost:5000/api/videos/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setVideos((prev) => [...prev, response.data]);
            setNewVideo({ title: "", description: "", file: null });
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

    return (
        <div className="alumni-interaction bg-gradient-to-r from-teal-100 to-teal-300 p-8">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-teal-700 drop-shadow-lg">Alumni Interaction</h1>

            {/* Alumni Details and Add Alumni Block side by side (75:25 ratio) */}
            <div className="alumni-section flex space-x-8 mb-8">
                {/* Alumni Details Block (75%) */}
                <div className="alumni-block w-3/4 max-h-[500px] overflow-y-scroll bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-800">Alumni Details</h2>
                    <div className="alumni-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alumniList.map((alumni, index) => (
                            <div key={index} className="alumni-card p-6 bg-gradient-to-r from-teal-200 to-teal-100 rounded-lg shadow-lg flex flex-col items-center space-y-4 transform hover:scale-105 transition duration-300 ease-in-out">
                                <h3 className="text-xl font-semibold text-teal-700">{alumni.name}</h3>
                                <p className="text-sm text-gray-700">Batch: {alumni.batch}</p>
                                <p className="text-sm text-gray-700">Company: {alumni.company}</p>
                                <div className="flex space-x-4">
                                    <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-teal-600 font-medium transition duration-200">
                                        LinkedIn
                                    </a>
                                    <a href={alumni.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-teal-600 font-medium transition duration-200">
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Alumni Block (25%) */}
                <div className="add-alumni-block max-h-[450px] overflow-y-hidden bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-teal-800">Add Alumni</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newAlumni.name}
                            onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })}
                            className="block w-full sm:w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={newAlumni.linkedin}
                            onChange={(e) => setNewAlumni({ ...newAlumni, linkedin: e.target.value })}
                            className="block w-full sm:w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={newAlumni.company}
                            onChange={(e) => setNewAlumni({ ...newAlumni, company: e.target.value })}
                            className="block w-full sm:w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            value={newAlumni.github}
                            onChange={(e) => setNewAlumni({ ...newAlumni, github: e.target.value })}
                            className="block w-full sm:w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            placeholder="Batch"
                            value={newAlumni.batch}
                            onChange={(e) => setNewAlumni({ ...newAlumni, batch: e.target.value })}
                            className="block w-full sm:w-80 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button onClick={handleAddAlumni} className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Add Alumni
                    </button>
                </div>
            </div>

            {/* Alumni Interview Videos and Upload Video Block side by side (75:25 ratio) */}
            <div className="video-section flex space-x-8 mb-8">
                {/* Alumni Interview Videos Block (75%) */}
                <div className="video-block w-3/4 max-h-[500px] overflow-y-scroll bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-800">Alumni Interview Videos</h2>
                    <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => (
                            <div key={index} className="video-card p-4 bg-gradient-to-r from-teal-200 to-teal-100 rounded-lg shadow-lg mb-4 w-full max-w-sm mx-auto transform hover:scale-105 transition duration-300 ease-in-out">
                                <h3 className="text-xl font-semibold text-teal-700">{video.title}</h3>
                                <p className="text-sm text-gray-700">{video.description}</p>
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

                {/* Upload Video Block (25%) */}
                <div className="upload-video-block max-h-[350px] overflow-hidden bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-teal-800">Upload Video</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        className="block w-80 p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <textarea
                        placeholder="Description"
                        value={newVideo.description}
                        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                        className="block w-80 p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="file"
                        onChange={(e) => setNewVideo({ ...newVideo, file: e.target.files[0] })}
                        className="block w-80 p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button onClick={handleUploadVideo} className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Upload Video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlumniInteractionPage;
