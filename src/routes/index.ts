import express, { Router } from "express";
import { userRoute } from "./user.route";
import { analyticsRoute } from "./analytic";
import { bookingRoute } from "./booking.route";
import { roomRoute } from "./room.route";
import { promotionRoute } from "./promotion.route";
import { productRoute } from "./product.route";
import { serviceRoute } from "./service.route";

const router: Router = express.Router();

router.use("/api/customer", userRoute);
router.use("/api/analytics", analyticsRoute);
// router.use("/api/employee", userRoute);
router.use("/api/booking", bookingRoute);
router.use("/api/room", roomRoute);
router.use("/api/promotion", promotionRoute);
router.use("/api/product", productRoute);
router.use("/api/service", serviceRoute);

export const indexRouter: Router = router;
