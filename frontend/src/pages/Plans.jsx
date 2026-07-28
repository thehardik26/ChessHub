import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getPlans,
    createPassOrder,
    verifyPassPayment,
} from "../api/bookings";
import loadRazorpay from "../utils/loadRazorpay";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Plans() {

    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPlans();
    }, []);

    async function loadPlans() {
        try {
            const res = await getPlans();
            setPlans(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function buyPass(plan) {
        try {
            const loaded = await loadRazorpay();

            if (!loaded) {
                alert("Unable to load Razorpay.");
                return;
            }

            const res = await createPassOrder(plan.id);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: res.data.amount,
                currency: res.data.currency,
                order_id: res.data.order_id,
                name: "ChessHub",
                description: plan.name,

                handler: async function (response) {
                    await verifyPassPayment({
                        plan_id: plan.id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    alert("Pass Purchased Successfully");
                    navigate("/dashboard");
                },

                theme: {
                    color: "#2563eb",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Unable to purchase pass.");
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />

            <div className="flex min-h-screen bg-gray-100">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Choose Your Monthly Pass
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {plans.map((plan) => (

                            <div
                                key={plan.id}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >

                                <h2 className="text-2xl font-bold">
                                    {plan.name}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {plan.description}
                                </p>

                                <div className="mt-5 space-y-2">

                                    <p>
                                        <strong>Price:</strong> ₹{plan.monthly_price}
                                    </p>

                                    <p>
                                        <strong>Duration:</strong> {plan.duration} Minutes
                                    </p>

                                    <p>
                                        <strong>Monthly Slots:</strong> {plan.monthly_slots}
                                    </p>

                                    <p>
                                        <strong>Weekly Limit:</strong> {plan.weekly_slots}
                                    </p>

                                </div>

                                <button
                                    onClick={() => buyPass(plan)}
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                                >
                                    Buy Pass
                                </button>

                            </div>

                        ))}

                    </div>

                </main>

            </div>
        </>
    );
}