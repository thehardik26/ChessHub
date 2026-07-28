import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    createBooking,
    getMyPass,
} from "../api/bookings";

import {
    createOrder,
    verifyPayment,
    confirmPassBooking,
} from "../api/payment";

import loadRazorpay from "../utils/loadRazorpay";

export default function PaymentProcessing() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [hasPass, setHasPass] = useState(false);

    useEffect(() => {
        async function checkPass() {
            try {
                const res = await getMyPass();

                if (
                    res.data.has_pass &&
                    res.data.pass.is_active &&
                    res.data.pass.remaining_slots > 0
                ) {
                    setHasPass(true);
                } else {
                    setHasPass(false);
                }
            } catch (err) {
                setHasPass(false);
            }
        }

        checkPass();
    }, []);

    async function handlePayment() {

        setLoading(true);

        try {

            const booking = await createBooking({
                plan: state.plan.id,
                booking_date: state.date
                    .toISOString()
                    .slice(0, 10),
                start_time: state.time,
                end_time: state.time,
            });

            const bookingId = booking.data.id;

            // If user has an active pass, confirm directly
            if (hasPass) {

                await confirmPassBooking(bookingId);

                alert("Booking confirmed using your Monthly Pass.");

                navigate("/my-bookings");

                return;
            }

            // Load Razorpay
            const loaded = await loadRazorpay();

            if (!loaded) {
                alert("Unable to load Razorpay.");
                return;
            }

            // Create Razorpay order
            const order = await createOrder(state.plan.session_price);

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.data.amount,

                currency: order.data.currency,

                name: "ChessHub",

                description: state.plan.name,

                order_id: order.data.id,

                handler: async function (response) {

                    try {

                        await verifyPayment({

                            booking_id: bookingId,

                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature,

                        });

                        alert("Payment Successful!");

                        navigate("/my-bookings");

                    } catch (err) {

                        console.error(err);

                        alert("Payment Verification Failed");

                    }

                },

                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },

                theme: {
                    color: "#2563EB",
                },

            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Booking Failed"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold mb-6">
                    Payment
                </h1>

                <div className="space-y-3">

                    <p>
                        <strong>Plan:</strong> {state.plan.name}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {state.date.toDateString()}
                    </p>

                    <p>
                        <strong>Time:</strong> {state.time}
                    </p>

                    {hasPass ? (

                        <div className="bg-green-100 text-green-700 rounded-lg p-3">

                            You have an active Monthly Pass.
                            <br />
                            No payment is required.

                        </div>

                    ) : (

                        <p className="text-2xl font-bold text-blue-600">
                            ₹ {state.plan.session_price}
                        </p>

                    )}

                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                    {loading
                        ? "Processing..."
                        : hasPass
                            ? "Confirm Booking"
                            : "Pay Now"}
                </button>

            </div>

        </div>

    );

}