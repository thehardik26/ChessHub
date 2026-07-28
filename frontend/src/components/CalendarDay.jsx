import { toISO } from "../utils/calendarUtils";

export default function CalendarDay({
    day,
    selectedDate,
    setSelectedDate,
    holidays,
    bookings,
}) {
    if (!day) {
        return <div className="aspect-square"></div>;
    }

    const iso = toISO(day);

    const dayHolidays = holidays.filter(
        (h) => h.date === iso
    );

    console.log("ISO:", iso);
    console.log("Holidays prop:", holidays);
    console.log("Day holidays:", dayHolidays);

    const hasHoliday = dayHolidays.length > 0;

    const booked = bookings.some(
        (b) => b.booking_date === iso
    );

    const isSaturday = day.getDay() === 6;
    const isSunday = day.getDay() === 0;

    const weekend = isSaturday || isSunday;

    const today = toISO(new Date()) === iso;

    const selected =
        selectedDate &&
        toISO(selectedDate) === iso;

    let bg =
        "bg-white border-gray-200 hover:bg-blue-50";

    if (hasHoliday) {
        bg = "bg-red-100 border-red-400 text-red-700";
    }
    else if (weekend) {
        bg = "bg-orange-100 border-orange-300 text-orange-700";
    }
    else if (booked) {
        bg = "bg-gray-200 border-gray-400 text-gray-700";
    }
    else if (selected) {
        bg = "bg-blue-600 border-blue-600 text-white";
    }
    else if (today) {
        bg = "bg-green-100 border-green-500";
    }

    return (
        <button
            disabled={hasHoliday || booked || weekend}
            onClick={() => setSelectedDate(day)}
            className={`aspect-square border rounded-xl p-2 transition-all ${bg}
            ${hasHoliday || booked || weekend
                    ? "cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
        >
            <div className="flex justify-between items-center">

                <span className="font-bold">
                    {day.getDate()}
                </span>

                {today && (
                    <span className="text-xs font-semibold">
                        Today
                    </span>
                )}

            </div>

            {hasHoliday && (
                <div className="mt-2 space-y-1">
                    {dayHolidays.map((holiday, index) => (
                        <p
                            key={index}
                            className="text-[10px] font-semibold leading-tight"
                        >
                            {holiday.name}
                        </p>
                    ))}
                </div>
            )}

            {!hasHoliday && weekend && (
                <div className="mt-3">

                    <p className="text-[10px] font-semibold">
                        {isSunday ? "Sunday" : "Saturday"}
                    </p>

                </div>
            )}

            {booked && (
                <div className="mt-3">

                    <p className="text-[10px] font-semibold">
                        Booked
                    </p>

                </div>
            )}

        </button>
    );
}