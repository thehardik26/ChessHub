import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, getMyPass } from "../api/bookings";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import PlanCard from "../components/PlanCard";

export default function Dashboard() {
    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);
    const [userPass, setUserPass] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [plansRes, passRes] = await Promise.all([
                getPlans(),
                getMyPass(),
            ]);

            setPlans(plansRes.data);

            if (passRes.data.has_pass) {
                setUserPass(passRes.data.pass);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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

                    {/* Welcome */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl shadow-xl p-10 text-white">
                        <h1 className="text-4xl font-bold">
                            ♟️ Welcome to ChessHub
                        </h1>

                        <p className="mt-3 text-lg text-blue-100">
                            Book professional chess sessions with experienced players.
                        </p>
                    </div>

                    {/* My Pass */}
                    <div className="mt-8 bg-white rounded-xl shadow-md p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            My Monthly Pass
                        </h2>

                        {userPass ? (
                            <>
                                <div className="space-y-3">

                                    <p>
                                        <strong>Plan:</strong> {userPass.plan_name}
                                    </p>

                                    <p>
                                        <strong>Remaining Slots:</strong>{" "}
                                        {userPass.remaining_slots}
                                    </p>

                                    <p>
                                        <strong>Expiry Date:</strong>{" "}
                                        {userPass.expiry_date}
                                    </p>

                                </div>

                                <button
                                    onClick={() => navigate("/calendar")}
                                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Book Session
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600">
                                    You don't have an active monthly pass.
                                </p>

                                <button
                                    onClick={() => navigate("/plans")}
                                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Buy Monthly Pass
                                </button>
                            </>
                        )}

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-500">
                                Available Plans
                            </h3>

                            <p className="text-4xl font-bold text-blue-600 mt-3">
                                {plans.length}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-500">
                                Remaining Sessions
                            </h3>

                            <p className="text-4xl font-bold text-green-600 mt-3">
                                {userPass ? userPass.remaining_slots : 0}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-500">
                                Pass Status
                            </h3>

                            <p
                                className={`text-2xl font-bold mt-3 ${
                                    userPass
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {userPass ? "Active" : "Inactive"}
                            </p>
                        </div>

                    </div>

                    {/* Available Plans */}
                    <div className="mt-10">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-3xl font-bold text-gray-800">
                                Available Plans
                            </h2>

                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                                {plans.length} Plans
                            </span>

                        </div>

                        {plans.length === 0 ? (

                            <div className="bg-white rounded-xl shadow-md p-10 text-center">

                                <h3 className="text-2xl font-semibold text-gray-700">
                                    No Plans Available
                                </h3>

                                <p className="text-gray-500 mt-3">
                                    Please add plans from the Django Admin.
                                </p>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                                {plans.map((plan) => (
                                    <PlanCard
                                        key={plan.id}
                                        plan={plan}
                                    />
                                ))}

                            </div>

                        )}

                    </div>

                </main>

            </div>
        </>
    );
}