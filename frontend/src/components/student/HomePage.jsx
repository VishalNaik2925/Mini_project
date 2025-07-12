import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Carousel library
import Sidebar from "./Sidebar";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isOfficerImageLoading, setIsOfficerImageLoading] = useState(true);

    // Scroll event listener for Back to Top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Back to Top functionality
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-cyan-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* College Logo at top-right corner */}
                <div className="absolute top-4 right-4">
                    <img
                        src="data:image/jpeg;base64,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" // Replace this with your college logo URL
                        alt="College Logo"
                        className="w-24 h-24 object-contain"
                    />
                </div>

                {/* Welcome Heading */}
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-purple-700 animate-fadeIn">
                        Welcome to <span className="text-pink-600">SMVITM</span>
                    </h1>
                    <p className="text-gray-700 mt-2 text-lg animate-fadeIn delay-200">
                        Empowering Excellence in Education and Career Development
                    </p>
                </header>

                {/* Moving Text for Upcoming Events */}
                <section
                    className=" mb-8 bg-blue-100 text-blue rounded-lg shadow-lg p-4 border border-blue-400"
                >
                    <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
                    <div className="overflow-hidden">
                        <marquee className="text-lg font-medium">
                            1) Hands-On Workshop on Docker! 🚀 | Date: 28/12/2024 | Location: SMVITM || 2) Final
                            Phase Submission of Mini-Project👨‍🎓 | Date: 13/12/2024 | Location: SMVITM ||
                        </marquee>
                    </div>
                </section>

                {/* College Photo Section with Carousel */}
                <section className="mb-8">
                    <Slider {...carouselSettings}>
                        <img
                            src="https://sode-edu.in/wp-content/uploads/2024/05/placement-2024-2-web-e1715928569513.png"
                            alt="SMVITM campus"
                            className="w-full rounded-lg shadow-lg h-100 object-cover hover:shadow-xl transition-shadow"
                        />
                        <img
                            src="https://sode-edu.in/wp-content/uploads/2024/06/Smvitm1.jpg"
                            alt="SMVITM building"
                            className="w-full rounded-lg shadow-lg h-100 object-cover hover:shadow-xl transition-shadow"
                        />
                        <img
                            src="https://sode-edu.in/wp-content/uploads/2020/08/smvitm-banner3-min.jpg"
                            alt="SMVITM view"
                            className="w-full rounded-lg shadow-lg h-100 object-cover hover:shadow-xl transition-shadow"
                        />
                    </Slider>
                </section>

                {/* Goals Section */}
                <section className="mb-8 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg shadow-lg p-6 border border-green-400 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Goals</h2>
                    <ul className="list-inside list-disc text-gray-700 space-y-2">
                        <li>
                            To individually counsel every new student joining this Institute to help them
                            understand their potential and overcome obstacles.
                        </li>
                        <li>Train students in technical concepts for skill building.</li>
                        <li>
                            Groom students’ personalities through soft skills and positive attitudinal changes.
                        </li>
                        <li>Equip students to handle challenges through life skills coaching.</li>
                        <li>
                            Prepare students for industry demands through Knowledge Clubs, Guest lectures,
                            Internships, and Alumni Speaks.
                        </li>
                    </ul>
                </section>

                {/* Vision Section */}
                <section className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg p-6 border border-blue-400 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h2>
                    <ul className="list-inside list-disc text-gray-700 space-y-2">
                        <li>
                            Nurture, train, and equip our students with the knowledge, skills, and humility to
                            meet industry standards.
                        </li>
                        <li>
                            Engineer careers and lives with character and care, keeping the vision of the
                            college in mind.
                        </li>
                        <li>Launch industry-ready students with knowledge and perseverance.</li>
                        <li>Reinforce a “Can do, never say die” attitude.</li>
                    </ul>
                </section>

                {/* Placement Officer Section */}
                <section className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg shadow-lg p-6 border border-orange-400 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-orange-800 mb-4">Placement Officer</h2>
                    <div className="flex flex-col md:flex-row items-center">
                        {isOfficerImageLoading && (
                            <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
                        )}
                        <img
                            src="https://sode-edu.in/wp-content/uploads/2024/01/KMB_7119.jpg" // Replace with the correct path to the officer's image
                            alt="Placement Officer"
                            className={`w-24 h-24 rounded-full shadow-lg mr-0 md:mr-6 ${
                                isOfficerImageLoading ? "hidden" : ""
                            }`}
                            onLoad={() => setIsOfficerImageLoading(false)}
                        />
                        <div className="space-y-4 mt-4 md:mt-0">
                            <h3 className="text-xl font-semibold text-gray-800">Mr. ROSHAN S KOTIAN</h3>
                            <p className="text-gray-700">
                                <strong>Address:</strong> 123 Placement Street, SMVITM Campus, City, Country
                            </p>
                            <p className="text-gray-700">
                                <strong>Phone:</strong> +91 9742406206
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong> placement@sode-edu.in
                            </p>
                            <p className="text-gray-700 mt-2">
                                Mr. ROSHAN S KOTIAN has over 2 years of experience in guiding students to achieve their
                                career goals. Under his leadership, our placement cell has achieved record-breaking
                                success.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Back to Top Button */}
                {showBackToTop && (
                    <button
                        className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none"
                        onClick={scrollToTop}
                        aria-label="Back to Top"
                    >
                        ↑
                    </button>
                )}
            </div>
        </div>
    );
}

export default HomePage;
