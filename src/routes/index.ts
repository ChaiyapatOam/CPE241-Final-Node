import express, { Router } from "express";
import { userRoute } from "./user.route";
import { analyticsRoute } from "./analytic";
import { bookingRoute } from "./booking.route";

const router: Router = express.Router();

router.use("/api/customer", userRoute);
router.use("/api/analytics", analyticsRoute);
// router.use("/api/employee", userRoute);
router.use("/api/booking", bookingRoute);
export const indexRouter: Router = router;
