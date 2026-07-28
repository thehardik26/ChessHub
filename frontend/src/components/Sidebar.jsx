import {
    FaHome,
    FaCalendarAlt,
    FaBook,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    }

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />,
        },
        {
            name: "My Bookings",
            path: "/my-bookings",
            icon: <FaBook />,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />,
        },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">

            {/* Navigation */}
            <nav className="flex-1 px-4 pt-8">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 mb-3 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            }`
                        }
                    >
                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    <FaSignOutAlt />

                    Logout
                </button>

            </div>

        </aside>
    );
}