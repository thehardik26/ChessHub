import api from "./axios";

export const getPlans = () =>
    api.get("bookings/plans/");

export const getCalendar = (year) =>
    api.get(`bookings/calendar/?year=${year}`);

export const createBooking = (data) =>
    api.post("bookings/create/", data);

export const getMyBookings = () =>
    api.get("bookings/my-bookings/");

export const getMyPass = () => {
    return api.get("bookings/my-pass/");
};
export const createPassOrder = (planId) =>
    api.post("bookings/pass/create-order/", {
        plan_id: planId,
    });

export const verifyPassPayment = (data) =>
    api.post("bookings/pass/verify-payment/", data);

export const rescheduleBooking = (id, data) =>
    api.patch(`/bookings/${id}/reschedule/`, data);