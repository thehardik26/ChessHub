import api from "./axios";

export const createOrder = (amount) =>
    api.post("bookings/booking/create-order/", {
        amount,
    });

export const verifyPayment = (data) =>
    api.post("bookings/booking/verify-payment/", data);

export const confirmPassBooking = (bookingId) =>
    api.post("bookings/booking/confirm-pass/", {
        booking_id: bookingId,
    });