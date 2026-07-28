import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import {
    FaChessKnight,
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

export default function Auth() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await loginUser(form);

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            // Used in Navbar
            localStorage.setItem("username", form.username);

            navigate("/dashboard");
        } catch (err) {
            alert("Invalid Username or Password");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-white to-indigo-200 overflow-hidden relative">

            {/* Background Blur */}
            <div className="absolute w-80 h-80 bg-blue-400/30 rounded-full blur-3xl -top-20 -left-20"></div>

            <div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -bottom-20 -right-20"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-md mx-5 rounded-3xl border border-white/40 bg-white/25 backdrop-blur-3xl shadow-2xl p-8">

                {/* Logo */}
                <div className="flex flex-col items-center">

                    <div className="w-20 h-20 rounded-3xl bg-white/50 backdrop-blur-lg flex items-center justify-center shadow-lg">

                        <FaChessKnight className="text-4xl text-blue-600" />

                    </div>

                    <h1 className="mt-5 text-4xl font-bold text-gray-800">
                        ChessHub
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome back! Sign in to continue.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="mt-8 space-y-5"
                >

                    {/* Username */}
                    <div className="flex items-center bg-white/60 backdrop-blur-lg rounded-2xl px-4 py-4 border border-white/40">

                        <FaUser className="text-gray-500 mr-3" />

                        <input
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username: e.target.value,
                                })
                            }
                            className="w-full bg-transparent outline-none placeholder-gray-500"
                            required
                        />

                    </div>

                    {/* Password */}
                    <div className="flex items-center bg-white/60 backdrop-blur-lg rounded-2xl px-4 py-4 border border-white/40">

                        <FaLock className="text-gray-500 mr-3" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            className="w-full bg-transparent outline-none placeholder-gray-500"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="text-gray-500 hover:text-blue-600"
                        >
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </button>

                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">

                        <button
                            type="button"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition"
                    >
                        Login
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center my-8">

                    <div className="flex-1 border-t border-gray-300"></div>

                    <span className="px-4 text-gray-500 text-sm">
                        OR
                    </span>

                    <div className="flex-1 border-t border-gray-300"></div>

                </div>

                {/* Register */}
                <div className="text-center">

                    <p className="text-gray-600">
                        Don't have an account?
                    </p>

                    <Link
                        to="/register"
                        className="inline-block mt-4 px-8 py-3 rounded-2xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                    >
                        Create Account
                    </Link>

                </div>

                {/* Footer */}
                <div className="mt-8 text-center">

                    <p className="text-xs text-gray-500">
                        © 2026 ChessHub. All Rights Reserved.
                    </p>

                </div>

            </div>

        </div>
    );
}