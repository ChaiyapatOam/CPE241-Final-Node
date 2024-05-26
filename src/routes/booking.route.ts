import { BookingController } from "@/controller/booking.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router
  .route("/")
  .post(BookingController.Booking)
  .get(BookingController.GetAllBooking);

export const bookingRoute: Router = router;
