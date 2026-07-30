import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getCalendar, getMyPass } from "../api/bookings";

import TimePicker from "../components/TimePicker";
import SelectedSlotsPanel from "../components/SelectedSlotsPanel";
import CalendarGrid from "../components/CalendarGrid";
import Navbar from "../components/Navbar";

export default function BookingCalendar() {

    const navigate = useNavigate();
    const location = useLocation();

    const plan = location.state?.plan;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");

    const [userPass, setUserPass] = useState(null);

    const [calendarData, setCalendarData] = useState({
        holidays: [],
        bookings: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const [calendarRes, passRes] = await Promise.all([
                getCalendar(new Date().getFullYear()),
                getMyPass(),
            ]);

            setCalendarData({
                holidays: calendarRes.data.holidays || [],
                bookings: calendarRes.data.bookings || [],
            });

            if (passRes.data.has_pass) {
                setUserPass(passRes.data.pass);
            } else {
                setUserPass(null);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function loadCalendar(
        year = new Date().getFullYear()
    ) {

        try {

            const res = await getCalendar(year);

            setCalendarData({
                holidays: res.data.holidays || [],
                bookings: res.data.bookings || [],
            });

        } catch (err) {
            console.error(err);
        }
    }

    function handleProceed() {

        if (!time) {
            alert("Please select a time slot.");
            return;
        }

        navigate("/payment", {
            state: {
                plan,
                date,
                time,
            },
        });
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">

                    <h2 className="text-3xl font-bold mb-4">
                        No Plan Selected
                    </h2>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Back to Dashboard
                    </button>

                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-center justify-between mb-8">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-3 rounded-xl shadow hover:bg-gray-50"
                        >
                            ← Back
                        </button>

                        <h1 className="text-3xl font-bold">
                            Book Chess Session
                        </h1>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* Left */}

                        <div className="bg-white rounded-2xl shadow-lg p-8">

                            <h2 className="text-3xl font-bold">
                                {plan.name}
                            </h2>

                            <p className="text-gray-600 mt-2 mb-6">
                                {plan.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">

                                <div>
                                    <p className="text-gray-500">
                                        Duration
                                    </p>

                                    <h3 className="text-xl font-bold">
                                        {plan.duration} Minutes
                                    </h3>
                                </div>

                                <div className="text-right">
                                    <p className="text-gray-500">
                                        Session Price
                                    </p>

                                    <h3 className="text-2xl font-bold text-blue-600">
                                        ₹ {plan.session_price}
                                    </h3>
                                </div>

                            </div>

                            <CalendarGrid
                                selectedDate={date}
                                setSelectedDate={setDate}
                                holidays={calendarData.holidays}
                                bookings={calendarData.bookings}
                                onYearChange={loadCalendar}
                            />

                            <div className="mt-8">

                                <h3 className="text-xl font-semibold mb-4">
                                    Select Time Slot
                                </h3>

                                <TimePicker
                                    selected={time}
                                    setSelected={setTime}
                                    selectedDate={date}
                                    bookings={calendarData.bookings}
                                />

                            </div>

                        </div>

                        {/* Right */}

                        <div className="bg-white rounded-2xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold mb-6">
                                Booking Summary
                            </h2>

                            <SelectedSlotsPanel
                                plan={plan}
                                date={date}
                                time={time}
                                userPass={userPass}
                            />

                            <button
                                onClick={handleProceed}
                                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
                            >
                                {userPass
                                    ? "Use Monthly Pass →"
                                    : "Proceed to Payment →"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}