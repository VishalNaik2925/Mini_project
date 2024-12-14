import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Sidebar from "./Sidebar"; // Reuse the Sidebar component from HomePage

// Register Chart.js components
Chart.register(...registerables);

function Dashboard() {
    // References for the bar chart and pie chart
    const chartRefBar = useRef(null);
    const chartRefPie = useRef(null);
    const chartInstanceBarRef = useRef(null);
    const chartInstancePieRef = useRef(null);

    // Functions to generate PDF files for the last four cards
    

    useEffect(() => {
        // Bar Chart
        const ctxBar = chartRefBar.current.getContext("2d");
        if (chartInstanceBarRef.current) {
            chartInstanceBarRef.current.destroy();
        }
        chartInstanceBarRef.current = new Chart(ctxBar, {
            type: "bar",
            data: {
                labels: ["2020-2021", "2021-2022", "2022-2023", "2023-2024","2024-2025"],
                datasets: [
                    {
                        label: "Placements per Year",
                        data: [55, 75, 50, 63, 30],
                        backgroundColor: ["#4A90E2", "#50E3C2", "#F5A623", "#B8E986", "#F8E71C"],
                        borderColor: "#3b82f6",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "years",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Placements",
                        },
                    },
                },
            },
        });

        // Pie Chart
        const ctxPie = chartRefPie.current.getContext("2d");
        if (chartInstancePieRef.current) {
            chartInstancePieRef.current.destroy();
        }
        chartInstancePieRef.current = new Chart(ctxPie, {
            type: "pie",
            data: {
                labels: ["Mangalore Infotech", "Robosoft Technologies", "Trianz, Bengaluru", "Academor, Bengaluru", "Palle Technologies, Bengaluru","GlowTouch Technologies","LearnFlu,  Bengaluru","Chegg India Pvt. Ltd"],
                datasets: [
                    {
                        data: [10, 3, 8, 10, 7,5,3,5],
                        backgroundColor: ["#36A376", "#50E3C2", "#F5A623", "#B8E986", "#F8E71C","#B8E71C","#3CC0A4","#50E3C2"],
                        borderColor: "#fff",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                },
            },
        });

        // Cleanup
        return () => {
            if (chartInstanceBarRef.current) chartInstanceBarRef.current.destroy();
            if (chartInstancePieRef.current) chartInstancePieRef.current.destroy();
        };
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 flex">
                {/* Cards on the left side */}
                <div className="w-full md:w-1/2 lg:w-1/2 p-4">
                    <header className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Placement Dashboard</h1>
                        <p className="text-gray-600">Track and analyze placement performance</p>
                    </header>
                    {/* Status Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-6">
                        {/* Current Year Cards */}
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Companies Visited</h2>
                            <p className="text-4xl font-bold text-blue-500 mt-4">20</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Students Placed</h2>
                            <p className="text-4xl font-bold text-green-500 mt-4">63</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Average Package</h2>
                            <p className="text-4xl font-bold text-orange-500 mt-4">₹3.6 LPA</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Total Offers</h2>
                            <p className="text-4xl font-bold text-purple-500 mt-4">151</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">Highest Package</h2>
                            <p className="text-4xl font-bold text-red-500 mt-4">₹8.5 LPA</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 h-56 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800"></h2>
                            <p className="text-4xl font-bold text-teal-500 mt-4"></p>
                        </div>
                    </div>

                    {/* Heading for Previous Year Stats */}
                    <header className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Previous Year Stats</h2>
                    </header>

                    {/* Previous Year Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 mb-6">
                        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">2024-23 Stats - Report 1</h2>
                            <a
                                href="/2023-24Placed students details  (6).xlsx" // Replace with the actual URL or file path
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 text-center"
                            >
                                Download PDF
                            </a>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">2024-23 Stats - Report 2</h2>
                            <a
                                href="/2024-25Placed students details  (6).xlsx" // Replace with the actual URL or file path
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 text-center"
                            >
                                Download PDF
                            </a>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">2024-23 Stats - Report 3</h2>
                            <a
                                href="vishal naik (4MW22CS184).pdf" // Replace with the actual URL or file path
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 text-center"
                            >
                                Download PDF
                            </a>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">2024-23 Stats - Report 4</h2>
                            <a
                                href="/path/to/Report4.pdf" // Replace with the actual URL or file path
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 text-center"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>

                </div>

                {/* Graphs on the right side */}
                <div className="w-full md:w-1/2 lg:w-1/2 p-4">
                    {/* Graph Section */}
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Placements per Years</h2>
                            <canvas ref={chartRefBar}></canvas>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Distribution</h2>
                            <canvas
                                ref={chartRefPie}
                                style={{ width: "100%", height: "300px" }} // Make the chart responsive
                            ></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
