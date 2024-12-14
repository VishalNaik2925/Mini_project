import React, { useState } from "react";
import axios from "axios";  // Import Axios for API calls

const AdminLogin = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        department: "",
    });

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Admin Login Data:", loginForm);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/admin/login", loginForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                console.log("Login successful:", response.data);
                // Store JWT token in localStorage
                localStorage.setItem("authToken", response.data.token);
                window.location.href = "/admin-dashboard"; // Redirect to a blank page or dashboard
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log("Admin Register Data:", registerForm);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/admin/register", registerForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                console.log("Admin registered successfully:", response.data);
                alert("Registration successful.");
                window.location.href = "/admin-dashboard";
                setIsLogin(true); // Switch to login form
            }
        } catch (error) {
            console.error("Error during admin registration:", error);
            alert("Error registering admin. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {isLogin ? "Admin Login" : "Register as Admin"}
                </h2>
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginForm.email}
                                onChange={handleLoginChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className="text-blue-500 hover:underline"
                            >
                                Register here
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={registerForm.name}
                                onChange={handleRegisterChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerForm.email}
                                onChange={handleRegisterChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={registerForm.phone}
                                onChange={handleRegisterChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={registerForm.password}
                                onChange={handleRegisterChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                Department:
                            </label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={registerForm.department}
                                onChange={handleRegisterChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Register
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className="text-blue-500 hover:underline"
                            >
                                Login here
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
