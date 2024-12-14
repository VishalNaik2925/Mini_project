import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [isExploreHovered, setIsExploreHovered] = useState(false);

    return (
        <div className="bg-blue-600 text-white h-screen p-4 sticky top-0">
            <ul className="space-y-4">
                <li>
                    <Link to="/" className="hover:bg-blue-700 p-3 block rounded">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="hover:bg-blue-700 p-3 block rounded">Dashboard</Link>
                </li>
                <li>
                    <Link to="/placement-drive" className="hover:bg-blue-700 p-3 block rounded">News and Events</Link>
                </li>
                <li
                    className="relative mt-auto" // Moves this option to the bottom
                    onMouseEnter={() => setIsExploreHovered(true)}
                    onMouseLeave={() => setIsExploreHovered(false)}
                >
                    <button className="hover:bg-blue-700 p-3 block w-full text-left rounded">
                        Explore More
                    </button>
                    {isExploreHovered && (
                        <div className="absolute top-12 left-0 bg-blue-500 shadow-md rounded-md w-40">
                            <ul>
                                <li className="hover:bg-blue-600 p-3">
                                    <Link to="/admin-login" className="block">As Admin</Link>
                                </li>
                                <li className="hover:bg-blue-600 p-3">
                                    <Link to="/student-login" className="block">As Student</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
