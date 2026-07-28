import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookings";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import BookingDetailsModal from "../components/BookingDetailsModal";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadBookings();
    }, []);

    async function loadBookings() {
        try {
            const res = await getMyBookings();
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const openBooking = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setShowModal(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />

            <div className="flex bg-gray-100 min-h-screen">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        📖 My Bookings
                    </h1>

                    {bookings.length === 0 ? (

                        <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                            <h2 className="text-2xl font-semibold text-gray-700">
                                No Bookings Found
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Book your first chess session from the dashboard.
                            </p>

                        </div>

                    ) : (

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                            <table className="w-full">

                                <thead className="bg-blue-600 text-white">

                                    <tr>

                                        <th className="py-4 px-4 text-left">
                                            Plan
                                        </th>

                                        <th className="py-4 px-4 text-left">
                                            Date
                                        </th>

                                        <th className="py-4 px-4 text-left">
                                            Start
                                        </th>

                                        <th className="py-4 px-4 text-left">
                                            End
                                        </th>

                                        <th className="py-4 px-4 text-left">
                                            Status
                                        </th>

                                        <th className="py-4 px-4 text-left">
                                            Payment
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {bookings.map((booking) => (

                                        <tr
                                            key={booking.id}
                                            onClick={() => openBooking(booking)}
                                            className="border-b hover:bg-blue-50 cursor-pointer transition"
                                        >

                                            <td className="py-4 px-4 font-semibold">
                                                {booking.plan_name}
                                            </td>

                                            <td className="py-4 px-4">
                                                {booking.booking_date}
                                            </td>

                                            <td className="py-4 px-4">
                                                {booking.start_time}
                                            </td>

                                            <td className="py-4 px-4">
                                                {booking.end_time}
                                            </td>

                                            <td className="py-4 px-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === "Confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : booking.status === "Cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>

                                            </td>

                                            <td className="py-4 px-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.payment_status === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {booking.payment_status}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}
                </div>

            </div>

            {showModal && selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={closeModal}
                />
            )}

        </>
    );
}