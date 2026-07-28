import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./hooks/ProtectedRoute";
import BookingCalendar from "./pages/BookingCalendar";
import MyBookings from "./pages/MyBookings";
import PaymentProcessing from "./pages/PaymentProcessing";
import Profile from "./pages/Profile";
import Plans from "./pages/Plans";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><BookingCalendar /></ProtectedRoute>}/>
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>}/>
        <Route path="/payment" element={<ProtectedRoute><PaymentProcessing /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/plans" element={<ProtectedRoute><Plans/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
