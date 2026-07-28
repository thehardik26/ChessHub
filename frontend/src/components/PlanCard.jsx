import { useNavigate } from "react-router-dom";

export default function PlanCard({ plan }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border">

            <div className="text-5xl text-center mb-4">
                ♟️
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
                {plan.name}
            </h2>

            <p className="text-gray-600 text-center mt-3">
                {plan.description}
            </p>

            <div className="mt-6 space-y-3">

                <p className="text-lg">
                    ⏱️ <strong>{plan.duration}</strong> Minutes
                </p>

                <p className="text-lg">
                    🎯 <strong>Weekly Slots:</strong> {plan.weekly_slots}
                </p>

                <p className="text-lg">
                    📅 <strong>Monthly Slots:</strong> {plan.monthly_slots}
                </p>

                <hr />

                <p className="text-lg text-blue-600 font-semibold">
                    💰 Single Session: ₹ {plan.session_price}
                </p>

                <p className="text-lg text-green-600 font-semibold">
                    ⭐ Monthly Pass: ₹ {plan.monthly_price}
                </p>

            </div>

            <div className="mt-6 space-y-3">

                <button
                    onClick={() =>
                        navigate("/calendar", {
                            state: { plan },
                        })
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
                >
                    Book Single Session
                </button>

                <button
                    onClick={() => navigate("/plans")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                    Buy Monthly Pass
                </button>

            </div>

        </div>
    );
}