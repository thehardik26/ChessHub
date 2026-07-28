const slots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "02:00",
    "03:00",
    "04:00",
];

export default function TimePicker({ selected, setSelected }) {
    return (
        <div>
            <h2>Select Time</h2>

            {slots.map((slot) => (
                <button
                    key={slot}
                    onClick={() => setSelected(slot)}
                    style={{
                        margin: "5px",
                        padding: "10px",
                        background: selected === slot ? "#4CAF50" : "#ddd",
                        color: selected === slot ? "white" : "black",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {slot}
                </button>
            ))}
        </div>
    );
}