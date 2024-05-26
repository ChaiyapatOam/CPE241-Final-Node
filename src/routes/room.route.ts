import { RoomController } from "@/controller/room.controller";
import express, { Router } from "express";
const router: Router = express.Router();

router.route("/").post(RoomController.Create).get(RoomController.GetAllRoom);
router.route("/roomtype").get(RoomController.GetAllRoomType);
router.route("/service").post(RoomController.AddService);
router.route("/product").post(RoomController.AddProduct);

export const roomRoute: Router = router;
