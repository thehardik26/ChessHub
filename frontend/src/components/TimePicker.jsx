import { toISO } from "../utils/calendarUtils";

const slots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-01:00",
    "01:00-02:00",
    "02:00-03:00",
    "03:00-04:00",
    "04:00-05:00",
    "05:00-06:00",
];

export default function TimePicker({
    selected,
    setSelected,
    selectedDate,
    bookings,
}) {
    const selectedISO = toISO(selectedDate);

    const bookedSlots = bookings
        .filter((b) => b.booking_date === selectedISO)
        .map((b) => b.start_time.slice(0, 5));

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">
                Select Time Slot
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {slots.map((slot) => {

                    const startTime = slot.split("-")[0];

                    const isBooked = bookedSlots.includes(startTime);

                    return (
                        <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => setSelected(slot)}
                            className={`py-3 rounded-lg font-semibold transition ${
                                isBooked
                                    ? "bg-red-500 text-white cursor-not-allowed opacity-60"
                                    : selected === slot
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <div>{slot}</div>

                            {isBooked && (
                                <div className="text-xs mt-1">
                                    Booked
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}